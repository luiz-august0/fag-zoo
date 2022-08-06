CREATE TABLE usuario(
    Usr_Codigo INT PRIMARY KEY AUTO_INCREMENT,
    Usr_Nome VARCHAR(55) NOT NULL,
    Usr_Login VARCHAR(55) NOT NULL,
    Usr_Senha VARCHAR(50) NOT NULL
);

CREATE TABLE animal(
    Ani_Codigo INT PRIMARY KEY AUTO_INCREMENT,
    Ani_Nome VARCHAR(80) NOT NULL,
    Ani_Identificacao VARCHAR(110),
    Ani_Sexo CHAR(1) NOT NULL,
    Ani_Origem VARCHAR(80),
    Ani_DataAdm DATE NOT NULL,
    Ani_HoraAdm TIME NOT NULL
);

CREATE TABLE nutricaoAnimal(
    NtrAni_Codigo INT PRIMARY KEY AUTO_INCREMENT,
    Ani_Codigo INT NOT NULL,
    NtrAni_Hora TIME NOT NULL,
    NtrAni_Alimen VARCHAR (50) NOT NULL,
    NtrAni_Qtd DOUBLE NOT NULL
);

CREATE TABLE historicoAnimal(
    HsAni_Codigo INT PRIMARY KEY AUTO_INCREMENT,
    Ani_Codigo INT NOT NULL,
    HsAni_Data DATE NOT NULL,
    HsAni_MtvInt TEXT,
    HsAni_Diag TEXT,
    HsAni_Peso  DOUBLE NOT NULL,
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
   HsEt_Acmp TEXT NOT NULL,
   HsEt_Data DATE NOT NULL,
   HsEt_Hora TIME NOT NULL
);

CREATE TABLE condutaAdotada(
   Ca_Codigo INT PRIMARY KEY AUTO_INCREMENT,
   HsEt_Codigo INT NOT NULL,
   Ca_Conduta TEXT NOT NULL
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

ALTER TABLE condutaAdotada 
ADD CONSTRAINT fk_conduta_historicoEt FOREIGN KEY (HsEt_Codigo)
REFERENCES historicoEtologico (HsEt_Codigo);

ALTER TABLE historicoClinico
ADD CONSTRAINT fk_historico_historicoAni FOREIGN KEY (HsAni_Codigo)
REFERENCES historicoAnimal (HsAni_Codigo);

ALTER TABLE historicoClinico_anexo
ADD CONSTRAINT fk_historicoCli_anexo FOREIGN KEY (HsCli_Codigo)
REFERENCES historicoClinico (HsCli_Codigo);