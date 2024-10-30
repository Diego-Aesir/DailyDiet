"use client";

import { downloadTaco } from "@/app/lib/api";
import styles from "@/app/styles/Tutorial.module.css";

export default function Tutorial({ onCancel }) {
  return (
    <div className={styles.container}>
      <button className={styles.buttonBack} onClick={onCancel}>
        Retornar
      </button>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Como criar sua primeira tabela de refeição:
        </h1>
        <h2 className={styles.subtitle}>
          Para começar, se você ainda não tiver uma refeição criada, clique no
          botão "Criar nova refeição". Escolha um nome para sua refeição, como
          "Café da manhã". A ordem é importante, então tente criar suas
          refeições planejadas em sequência. Após digitar o nome, clique em
          "Criar Refeição". Se precisar alterar o nome, basta clicar nele,
          editar e clicar fora da caixa de texto.
        </h2>
        <br />

        <h1 className={styles.title}>Removendo uma refeição</h1>
        <h2 className={styles.subtitle}>
          Se você decidir que não precisa mais de uma refeição, clique em
          "Apagar" e confirme a ação. Lembre-se, essa ação não pode ser
          desfeita, então tenha certeza antes de prosseguir.
        </h2>
        <br />

        <h1 className={styles.title}>Adicionando uma nova comida</h1>
        <h2 className={styles.subtitle}>
          Com sua tabela de refeições em mãos, você pode começar a adicionar
          suas comidas. Clique em "Nova Comida" e preencha os campos
          necessários. Lembre-se: para Proteínas, Carboidratos e Gorduras,
          insira apenas números, como: 9.2, 100, 10.10 ou 0. A vírgula deve ser
          substituída pelo ponto (.), então evite usar 9,5 ou 10,10. Se você não
          souber como coletar esses dados, não se preocupe; mais abaixo, você
          encontrará um método utilizando a Tabela Brasileira de Composição de
          Alimentos (TACO) que facilitará sua vida.
        </h2>
        <br />

        <h1 className={styles.title}>Alterando os dados da comida</h1>
        <h2 className={styles.subtitle}>
          Para alterar os dados, o processo é bem simples. Clique no campo que
          deseja modificar, faça a alteração e clique fora.
        </h2>
        <br />

        <h1 className={styles.title}>Removendo uma comida</h1>
        <h2 className={styles.subtitle}>
          Para deletar uma comida, clique em "Deletar" e confirme (essa ação não
          pode ser desfeita).
        </h2>
        <br />

        <h1 className={styles.title}>Entendendo o cálculo de macros</h1>
        <h2 className={styles.subtitle}>
          Os macros serão calculados com base nas informações disponíveis, com
          os valores de Proteínas, Carboidratos e Gorduras obtidos de cada
          tabela. A fórmula para calcular as calorias é: (Proteínas x 4) +
          (Carboidratos x 4) + (Gorduras x 9). Preste atenção a esses valores,
          pois são essenciais para o seu acompanhamento.
        </h2>
        <br />

        <h1 className={styles.title}>
          Tabela Brasileira de Composição de Alimentos - TACO
        </h1>
        <button className={styles.downloadButton} onClick={downloadTaco}>
          Baixe a Tabela
        </button>
        <h2 className={styles.subtitle}>
          Após baixar a tabela, abra-a. Não se preocupe em ler tudo, pois o
          conteúdo é extenso. Aqui, o foco é nas informações sobre as comidas.
          Por exemplo, para adicionar 100 gramas de Laranja Baía, abra a tabela
          e pressione (em conjunto): CTRL + F (Windows) ou Command (ou Cmd) ⌘ +
          F (Mac). Digite: "Laranja, baía, crua" e pressione Enter ou clique na
          seta para baixo.
        </h2>
        <br />

        <img
          className={styles.image}
          src="/LaranjaTable.png"
          alt="Tabela da Laranja"
        />

        <h2 className={styles.subtitle}>
          Agora que você está visualizando a tabela, lembre-se de que os valores
          são baseados em 100 gramas de cada alimento, como descrito no início
          da tabela.
        </h2>
        <br />

        <img
          className={styles.image}
          src="/TableSelection.png"
          alt="Seleção de Proteínas e Carboidratos"
        />

        <h2 className={styles.subtitle}>
          A tabela separa facilmente os valores de Proteínas, Lipídeos
          (Gordura), Colesterol, Carboidratos, etc. Fique atento aos valores de
          Proteínas, Lipídeos e Carboidratos.
        </h2>
        <br />

        <img
          className={styles.image}
          src="/LaranjaValues.png"
          alt="Valores da Laranja"
        />

        <h2 className={styles.subtitle}>
          Agora, colete esses valores e adicione em nossa tabela, nos campos
          correspondentes: Proteínas - Proteínas, Lipídeos - Gorduras e
          Carboidratos - Carboidratos.
        </h2>
        <br />

        <h1 className={styles.title}>
          Como ajustar os valores da dieta? Preciso comer 100 gramas de tudo?
        </h1>
        <h2 className={styles.subtitle}>
          Não se preocupe, o processo é mais simples do que parece. Veja o
          exemplo: Se você está com muita fome e deseja comer 200g da Laranja
          Baía, como deve proceder? Acesse o site:{" "}
          <a
            target="_blank"
            className={styles.siteRef}
            href="https://www.4devs.com.br/calculadora_regra_tres_simples"
          >
            Regra de 3
          </a>
          .
        </h2>
        <br />

        <h2 className={styles.subtitle}>
          Agora, adicione os valores. De acordo com a tabela, 100g de Laranja
          Baía contém 1g de proteína, então vamos adicionar assim:
        </h2>
        <br />

        <img
          className={styles.image}
          src="/ProteinValueOne.png"
          alt="Valores Primários Adicionados"
        />

        <h2 className={styles.subtitle}>
          Agora, precisamos apenas adicionar o valor que desejamos. Se queremos
          comer 200g desse alimento, devemos inserir:
        </h2>
        <br />

        <img
          className={styles.image}
          src="/ProteinValueTwo.png"
          alt="Valores Secundários Adicionados"
        />

        <h2 className={styles.subtitle}>
          Perfeito! Agora temos o valor desejado de proteínas para 200g. Por
          exemplo, para 200g da Laranja, obtemos 2g de proteínas. E se o valor
          de Carboidrato for 11.5 e eu quiser apenas 50g? Vamos utilizar o mesmo
          raciocínio.
        </h2>
        <br />

        <img
          className={styles.image}
          src="/CarbValueTwo.png"
          alt="Carboidratos da Laranja Baía"
        />

        <h2 className={styles.subtitle}>
          Agora você está pronto para usar nossa tabela com confiança!
        </h2>
        <br />

        <h1 className={styles.title}>
          Como adicionar produtos do supermercado?
        </h1>
        <h2 className={styles.subtitle}>
          O processo é igualmente simples, utilizando o mesmo método da Tabela
          TACO. Primeiramente, lembre-se que todo produto vendido deve ter uma
          tabela nutricional. Neste exemplo, usaremos o Whey.
        </h2>
        <br />

        <img
          className={styles.image}
          src="/whey.png"
          alt="Valor nutricional do Whey"
        />

        <h2 className={styles.subtitle}>
          Com as informações nutricionais em mãos, vamos aplicar a regra de
          três. Se eu quiser consumir 100g de Whey, os valores são os seguintes:
        </h2>
        <br />

        <h3 className={styles.subheader}>Proteínas:</h3>
        <img
          className={styles.image}
          src="/WheyProtein.png"
          alt="Valor nutricional de proteínas do Whey"
        />

        <h3 className={styles.subheader}>Carboidratos:</h3>
        <img
          className={styles.image}
          src="/WheyCarb.png"
          alt="Valor nutricional de carboidrato do Whey"
        />

        <h3 className={styles.subheader}>Gorduras:</h3>
        <img
          className={styles.image}
          src="/WheyFat.png"
          alt="Valor nutricional de gordura do Whey"
        />

        <h3 className={styles.subheader}>
          Ao adicionar o valor de gordura, sempre escolha "Gorduras Totais".
        </h3>

        <h1 className={styles.title}>"Diferença"</h1>
        <h2 className={styles.subtitle}>
          O Gasto Calórico Diário (GCD) é uma medida essencial para entender
          quantas calorias seu corpo precisa diariamente. Para calcular o GCD,
          usamos informações do seu perfil, como peso, altura e idade.
        </h2>
        <h2 className={styles.subtitle}>
          Aqui está o que os resultados do GCD podem indicar:
          <ul>
            <li>
              <strong>Se a Diferença for positiva:</strong> Isso significa que
              você está consumindo mais calorias do que seu corpo precisa. Esse
              é o chamado "superávit calórico", uma estratégia comum chamada de
              "bulking", usada para ganhar peso ou massa muscular.
            </li>
            <br />
            <li>
              <strong>Se a Diferença for negativa:</strong> Isso indica que você
              está consumindo menos calorias do que seu corpo precisa, o que se
              traduz em um "déficit calórico". Essa abordagem é conhecida como
              "cutting" e é utilizada para perder peso.
            </li>
            <br />
          </ul>
          <p>
            Compreender a diferença entre esses estados é fundamental para
            ajustar sua dieta de acordo com seus objetivos, seja para ganhar
            massa muscular ou perder peso.
          </p>
        </h2>
        <br />
      </div>
    </div>
  );
}
