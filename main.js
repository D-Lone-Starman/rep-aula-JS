
let cartData = localStorage.getItem('cart');
let cart = [];

try {
    cart = Array.isArray(JSON.parse(cartData)) ? JSON.parse(cartData) : [];
} catch {
    cart = [];
}

let userBalance = parseFloat(localStorage.getItem('userBalance')) || 500;

updateCartCount();
updateBalanceDisplay();


function updateBalanceDisplay() {
    const balanceElement = document.getElementById('user-balance');
    if (balanceElement) {
        balanceElement.innerText = `Saldo: R$${userBalance.toFixed(2)}`;
    }
}


function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.innerText = cart.length;
    }
}


function addToCart(id) {
    const product = document.querySelector(`.product[data-id="${id}"]`);
    if (!product) {
        console.error("Produto não encontrado!");
        return;
    }

    const name = product.getAttribute("data-name");
    const price = parseFloat(product.getAttribute("data-price"));

    const item = { id, name, price };

    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    Toastify({
        text: `${name} foi adicionado ao carrinho!`,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#2196f3",
        stopOnFocus: true
    }).showToast();
}

function addBalance() {
    const input = document.getElementById("saldo-input"); 

    if (!input) return;

    const valor = parseFloat(input.value);
    if (isNaN(valor) || valor <= 0) {
        Toastify({
            text: "Insira um valor válido!",
            duration: 3000,
            style: { background: "#ff4d4d" }
        }).showToast();
        return;
    }

    userBalance += valor;
    localStorage.setItem("userBalance", userBalance);
    updateBalanceDisplay();

    Toastify({
        text: `R$${valor.toFixed(2)} adicionados ao saldo!`,
        duration: 3000,
        style: { background: "#4CAF50" }
    }).showToast();

    input.value = "";
}



function loadCartPage() {
    const cartContainer = document.getElementById('cart-items');
    if (!cartContainer) return;

    cartContainer.innerHTML = "";
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

    const cartItems = getCartItems(); // however you get cart items
    if (cartItems.length === 0) {
        document.getElementById('empty-cart-message').style.display = 'block';
    } else {
        document.getElementById('empty-cart-message').style.display = 'none';
    }

    const cartTotalElement = document.getElementById("cart-total");
    if (cartTotalElement) {
        cartTotalElement.innerText = `Total: R$${total.toFixed(2)}`;
    }
}


function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    loadCartPage();
}

function finalizePurchase() {
    let total = cart.reduce((sum, item) => sum + item.price, 0);

    if (total > userBalance) {
        Toastify({
            text: "Saldo insuficiente!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "#ff4d4d",
            stopOnFocus: true
        }).showToast();
    } else {
        userBalance -= total;
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('userBalance', userBalance);
        updateCartCount();
        updateBalanceDisplay();
        loadCartPage();

        Toastify({
            text: "Compra realizada com sucesso!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "#4CAF50",
            stopOnFocus: true
        }).showToast();
    }
}


function load3DModel(canvasId, modelPath) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    camera.position.z = 3;
    camera.position.y = 1;

    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    new THREE.GLTFLoader().load(modelPath, function (gltf) {
        const model = gltf.scene;

        // Adiciona à cena primeiro para garantir cálculos corretos
        scene.add(model);
        model.updateMatrixWorld(true);

        // Centralizar modelo
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        // Redimensionar modelo
        const size = box.getSize(new THREE.Vector3()).length();
        const scaleFactor = 3 / size;
        model.scale.setScalar(scaleFactor);

        // Aplicar wireframe a todos os materiais
        model.traverse((child) => {
            if (child.isMesh) {
                if (child.material) {
                    child.material.wireframe = true;
                }
            }
        });

        function animate() {
            requestAnimationFrame(animate);
            model.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        animate();
    }, undefined, function (error) {
        console.error("Erro ao carregar modelo:", error);
    });

    window.addEventListener("resize", () => {
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    });
}



document.addEventListener("DOMContentLoaded", function () {
    load3DModel("viewer1", "./models/sword_of_artorias.glb");
    load3DModel("viewer2", "./models/bulky_knight.glb");
    load3DModel("viewer3", "./models/chunky_knight.glb");
    load3DModel("viewer4", "./models/bulky_knight.glb");
    load3DModel("viewer5", "./models/bulky_knight.glb");
});
