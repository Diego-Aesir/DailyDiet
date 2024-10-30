import styles from "@/app/styles/homePage.module.css";

export default function Home() {
  return (
    <div className={styles.background}>
      <h2 className={styles.title}>Bem-vindo ao Daily Diet!</h2>
      <p className={styles.welcomeText}>
        A plataforma ideal para você montar e gerenciar sua dieta de forma
        prática e simples.
      </p>

      <div className={styles.featureSection}>
        <div className={styles.textContainer}>
          <h3 className={styles.featuresTitle}>Funcionalidades</h3>
          <ul className={styles.featuresList}>
            <li className={styles.featureItem}>
              <strong>Crie sua Conta:</strong> Comece sua jornada com um simples
              registro.
            </li>
            <li className={styles.featureItem}>
              <strong>Monte sua Dieta:</strong> Crie refeições personalizadas e
              adicione alimentos.
            </li>
            <li className={styles.featureItem}>
              <strong>Calorias Automaticamente:</strong> Veja os valores
              calóricos calculados instantaneamente.
            </li>
            <li className={styles.featureItem}>
              <strong>Compartilhe com Nutricionistas:</strong> Permita que
              profissionais acompanhem suas dietas.
            </li>
          </ul>
        </div>
        <img
          className={styles.image}
          src="./DDMainDiet.png"
          alt="Imagem principal do Daily Diet"
        />
      </div>

      <div className={styles.howItWorks}>
        <h3 className={styles.howItWorksTitle}>Como Funciona</h3>
        <div className={styles.howItWorksSection}>
          <img
            className={styles.image}
            src="./DDdiet.png"
            alt="Imagem da dieta"
          />
          <ol className={styles.howItWorksList}>
            <li className={styles.howItWorksItem}>Crie sua conta.</li>
            <li className={styles.howItWorksItem}>Monte sua dieta.</li>
            <li className={styles.howItWorksItem}>
              Adicione suas refeições e alimentos.
            </li>
            <li className={styles.howItWorksItem}>
              Veja os cálculos de calorias automaticamente.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
