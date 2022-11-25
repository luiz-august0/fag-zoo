CREATE TABLE setor(
    Str_Codigo INT PRIMARY KEY AUTO_INCREMENT,
    Str_Descricao VARCHAR(50) NOT NULL
);

CREATE TABLE usuario(
    Usr_Codigo INT PRIMARY KEY AUTO_INCREMENT,
    Usr_Login VARCHAR(55) NOT NULL UNIQUE,
    Usr_Senha VARCHAR(255) NOT NULL,
    Str_Codigo INT NOT NULL
);

CREATE TABLE animal(
    Ani_Codigo INT PRIMARY KEY AUTO_INCREMENT,
    Ani_Nome VARCHAR(80) NOT NULL,
    Ani_NomeCient VARCHAR(80),
    Ani_Apelido VARCHAR(80),
    Ani_Identificacao VARCHAR(110),
    Ani_Sexo CHAR(1) NOT NULL,
    Ani_Origem VARCHAR(80),
    Ani_DataAdm DATE NOT NULL,
    Ani_DataExp DATE
);

CREATE TABLE nutricaoAnimal(
    NtrAni_Codigo INT PRIMARY KEY AUTO_INCREMENT,
    Ani_Codigo INT NOT NULL,
    NtrAni_Dia CHAR(3) NOT NULL,
    NtrAni_Hora TIME NOT NULL,
    NtrAni_Alimen VARCHAR (50) NOT NULL,
    NtrAni_UnMed CHAR(2) NOT NULL,
    NtrAni_Qtd FLOAT NOT NULL,
    NtrAni_Obs VARCHAR(125) 
);

CREATE TABLE historicoAnimal(
    HsAni_Codigo INT PRIMARY KEY AUTO_INCREMENT,
    Ani_Codigo INT NOT NULL,
    HsAni_Data DATE NOT NULL,
    HsAni_Hora TIME NOT NULL,
    HsAni_MtvInt TEXT,
    HsAni_Medico VARCHAR(80),
    HsAni_Diag TEXT,
    HsAni_Peso DOUBLE NOT NULL,
    HsAni_Orient TEXT,
    HsAni_Evl TEXT,
    HsAni_ExComp TEXT
);

CREATE TABLE historicoMonitoracao(
   HsMo_Codigo INT PRIMARY KEY AUTO_INCREMENT,
   HsAni_Codigo INT NOT NULL,
   HsMo_Tipo VARCHAR(50) NOT NULL,
   HsMo_Hora TIME NOT NULL,
   HsMo_Result DOUBLE NOT NULL
);

CREATE TABLE viasAdm(
   Via_Codigo INT PRIMARY KEY AUTO_INCREMENT,
   VIa_Desc VARCHAR(50) NOT NULL
);

CREATE TABLE historicoMedicacao(
   HsMed_Codigo INT PRIMARY KEY AUTO_INCREMENT,
   HsAni_Codigo INT NOT NULL,
   HsMed_Mdc VARCHAR(50) NOT NULL,
   Via_Codigo INT NOT NULL,
   HsMed_PosUn VARCHAR(10) NOT NULL,
   HsMed_PosQtd DOUBLE NOT NULL
);

CREATE TABLE medicacaoHorario(
   Mh_Codigo INT PRIMARY KEY AUTO_INCREMENT,
   HsMed_Codigo INT NOT NULL,
   HsMed_Data DATE NOT NULL,
   HsMed_Hora TIME NOT NULL
);

CREATE TABLE historicoEtologico(
   HsEt_Codigo INT PRIMARY KEY AUTO_INCREMENT,
   Ani_Codigo INT NOT NULL,
   HsEt_Comp VARCHAR(12) NOT NULL,
   HsEt_OutrComp VARCHAR(50),
   HsEt_Obs TEXT,
   HsEt_Data DATE NOT NULL,
   HsEt_Hora TIME NOT NULL,
   HsEt_Resp VARCHAR(55) NOT NULL
);

CREATE TABLE atividadeAnimal(
   Ativ_Codigo INT PRIMARY KEY AUTO_INCREMENT,
   Ani_Codigo INT NOT NULL,
   Ativ_Desc TEXT NOT NULL,
   Ativ_Data DATE NOT NULL,
   Ativ_Hora TIME NOT NULL,
   Ativ_Resp VARCHAR(55) NOT NULL,
   Ativ_Interacao CHAR(1) NOT NULL
);

CREATE TABLE imagensAtividade(
   Ativ_Codigo INT NOT NULL,
   ImgAt_Desc VARCHAR(255)
);

CREATE TABLE historicoClinico(
   HsCli_Codigo INT PRIMARY KEY AUTO_INCREMENT,
   HsAni_Codigo INT NOT NULL,
   HsCli_Exame TEXT NOT NULL,
   HsCli_Data DATE NOT NULL,
   HsCli_Hora TIME NOT NULL
);

CREATE TABLE historicoClinico_anexo(
   Anx_Codigo INT PRIMARY KEY AUTO_INCREMENT,
   HsCli_Codigo INT NOT NULL,
   Anx_Desc VARCHAR(255) NOT NULL
);

ALTER TABLE usuario
ADD CONSTRAINT fk_usuario_setor FOREIGN KEY (Str_Codigo)
REFERENCES setor (Str_Codigo);

ALTER TABLE nutricaoAnimal
ADD CONSTRAINT fk_nutricao_animal FOREIGN KEY (Ani_Codigo)
REFERENCES animal (Ani_Codigo);

ALTER TABLE historicoAnimal
ADD CONSTRAINT fk_historico_animal FOREIGN KEY (Ani_Codigo)
REFERENCES animal (Ani_Codigo);

ALTER TABLE historicoMonitoracao 
ADD CONSTRAINT fk_historicoAniMo FOREIGN KEY (HsAni_Codigo) REFERENCES historicoAnimal (HsAni_Codigo);

ALTER TABLE historicoMedicacao 
ADD CONSTRAINT fk_historicoMed_via FOREIGN KEY (Via_Codigo)
REFERENCES viasAdm (Via_Codigo);

ALTER TABLE medicacaoHorario
ADD CONSTRAINT fk_medicacao_historico FOREIGN KEY (HsMed_Codigo)
REFERENCES historicoMedicacao (HsMed_Codigo);

ALTER TABLE historicoEtologico
ADD CONSTRAINT fk_historicoEt_animal FOREIGN KEY (Ani_Codigo)
REFERENCES animal (Ani_Codigo);

ALTER TABLE atividadeAnimal
ADD CONSTRAINT fk_atividade_animal FOREIGN KEY (Ani_Codigo)
REFERENCES animal (Ani_Codigo);

ALTER TABLE imagensAtividade
ADD CONSTRAINT fk_imagem_atividade FOREIGN KEY (Ativ_Codigo)
REFERENCES atividadeAnimal (Ativ_Codigo);

ALTER TABLE historicoClinico
ADD CONSTRAINT fk_historico_historicoAni FOREIGN KEY (HsAni_Codigo)
REFERENCES historicoAnimal (HsAni_Codigo);

ALTER TABLE historicoClinico_anexo
ADD CONSTRAINT fk_historicoCli_anexo FOREIGN KEY (HsCli_Codigo)
REFERENCES historicoClinico (HsCli_Codigo);

--------------------------------------------------------- Triggers  -------------------------------------------------------------------------

DELIMITER $$

CREATE TRIGGER before_animal_delete 
BEFORE DELETE ON animal FOR EACH ROW
BEGIN
    DELETE FROM atividadeanimal WHERE Ani_Codigo = OLD.Ani_Codigo;
    DELETE FROM historicoanimal WHERE Ani_Codigo = OLD.Ani_Codigo;
    DELETE FROM historicoetologico WHERE Ani_Codigo = OLD.Ani_Codigo;
    DELETE FROM nutricaoanimal WHERE Ani_Codigo = OLD.Ani_Codigo;
END$$    

DELIMITER ;



DELIMITER $$

CREATE TRIGGER before_historicoanimal_delete
BEFORE DELETE ON historicoanimal FOR EACH ROW
BEGIN
    DELETE FROM historicomonitoracao WHERE HsAni_Codigo = OLD.HsAni_Codigo;
    DELETE FROM historicoclinico WHERE HsAni_Codigo = OLD.HsAni_Codigo;
    DELETE FROM historicomedicacao WHERE HsAni_Codigo = OLD.HsAni_Codigo;
END$$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER before_historimedicacao_delete
BEFORE DELETE ON historicomedicacao FOR EACH ROW
BEGIN
    DELETE FROM medicacaohorario WHERE HsMed_Codigo = OLD.HsMed_Codigo;
END$$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER before_atividadeanimal_delete
BEFORE DELETE ON atividadeanimal FOR EACH ROW
BEGIN
    DELETE FROM imagensatividade WHERE Ativ_Codigo = OLD.Ativ_Codigo;
END$$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER before_historicoclinico_delete
BEFORE DELETE ON historicoclinico FOR EACH ROW
BEGIN
    DELETE FROM historicoclinico_anexo WHERE HsCli_Codigo = OLD.HsCli_Codigo;
END$$

DELIMITER ;