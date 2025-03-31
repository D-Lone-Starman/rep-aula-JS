

// Verifica se há um carrinho salvo, caso contrario gera um carrinho
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount(); // 

function addToCart(id) {
    const product = document.querySelector(`.product[data-id="${id}"]`);
    if (!product) {
        console.error("Produto não encontrado!");
        return;
    }

    const name = product.getAttribute("data-name");
    const price = parseFloat(product.getAttribute("data-price"));

    //objeto do produto
    const item = { id, name, price };

    //array do carrinho
    cart.push(item);

    // Salvar localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Contador do carrinho
    updateCartCount();

    alert(`${name} foi adicionado ao carrinho!`);
}

//  número de itens 
function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
}

function loadCartPage() {
    const cartContainer = document.getElementById('cart-items');
    if (!cartContainer) return; // Evita erro se estiver na página principal

    cartContainer.innerHTML = ""; // Limpa a lista antes de renderizar
    let total = 0;

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <p>${item.name} - R$${item.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Remover</button>
        `;
        cartContainer.appendChild(div);
        total += item.price;
    });

    document.getElementById("cart-total").innerText = `Total: R$${total.toFixed(2)}`;
}


function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    loadCartPage(); 
}

// Carregar um modelo 3D dentro de um <canvas>
function load3DModel(canvasId, modelPath) {
    const canvas = document.getElementById(canvasId);

    // Criar cena, câmera e renderizador
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    camera.position.z = 3;

    // Adicionar luz
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    // Carregar modelo GLB
    new THREE.GLTFLoader().load(modelPath, function (gltf) {
        const model = gltf.scene;
        scene.add(model);
        model.position.set(0, -1, 0);
        model.scale.set(1, 1, 1); // Ajuste o tamanho, se necessário

        // Função de animação
        function animate() {
            requestAnimationFrame(animate);
            model.rotation.y += 0.01; // Faz o modelo girar lentamente
            renderer.render(scene, camera);
        }
        animate();
    }, undefined, function (error) {
        console.error("Erro ao carregar modelo:", error);
    });

    // Ajustar tamanho do canvas 
    window.addEventListener("resize", () => {
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    });
}

// Exemplo de uso
document.addEventListener("DOMContentLoaded", function () {
    load3DModel("meuCanvas", "./models/meu_modelo.glb");
});


// Carregar os modelos na página
load3DModel("viewer1", "models/galatingrailord.glb");
load3DModel("viewer2", );


load3DModel("viewer1");
load3DModel("viewer2");
