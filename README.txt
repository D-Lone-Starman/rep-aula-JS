==================================================
 LOJA ONLINE DE MODELOS 3D - README
==================================================

SOBRE O PROJETO  
Este projeto é uma loja online simples que permite a venda de modelos 3D.  
Os usuários podem visualizar os modelos, adicioná-los ao carrinho e ver o total da compra.  
A loja foi criada utilizando apenas HTML, CSS e JavaScript (sem backend).  

==================================================
ESTRUTURA DOS ARQUIVOS
==================================================
/                   -> Pasta raiz do projeto  
  ├── index.html    -> Página principal da loja  
  ├── carrinho.html -> Página do carrinho de compras  
  ├── style.css     -> Estilos visuais da loja  
  ├── script.js     -> Lógica do carrinho e carregamento dos modelos 3D  
  ├── models/       -> Pasta onde ficam os modelos 3D (.glb)  
  ├── assets/       -> Pasta para imagens ou outros arquivos auxiliares  
  └── README.txt    -> Este arquivo  

==================================================
COMO USAR
==================================================
1. Abrir a loja  
   - Abra o arquivo `index.html` no navegador para acessar a loja.  

2. Adicionar produtos ao carrinho  
   - Clique no botão "Adicionar ao Carrinho" de qualquer modelo.  

3. Visualizar o carrinho  
   - Clique no link para acessar `carrinho.html`.  

4. Remover produtos  
   - Na página do carrinho, clique no botão "Remover" ao lado do item.  

5. Salvar o carrinho  
   - Os produtos adicionados ao carrinho são armazenados no navegador  
     usando `localStorage`, então eles permanecem mesmo após recarregar a página.  

==================================================
TECNOLOGIAS UTILIZADAS
==================================================
- HTML5  
- CSS3  
- JavaScript (puro)  
- Three.js (para visualização dos modelos 3D)  

==================================================
NOTAS IMPORTANTES
==================================================
- Para visualizar modelos 3D, os arquivos `.glb` devem estar na pasta `/models/`.  
- Certifique-se de que o navegador suporta `WebGL` para carregar os modelos.  
- O carrinho de compras não tem integração com um banco de dados ou pagamento real no momento.  

==================================================
CONTATO
==================================================
Caso tenha dúvidas ou sugestões, entre em contato pelo email: jp.estrellacord@yahoo.com
