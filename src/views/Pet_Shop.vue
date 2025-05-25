<template>
  <div class="petshop-container">
    <h1 class="petshop-title">Premium Cat's</h1>
    <p class="petshop-description">
      Explore a wide variety of high-quality cat breeds for your pet. From common breeds to 
      the best breeds in the world, let's read more to find out lots of cat information for cat lovers.
    </p>

    <div class="product-item">
      <div class="product-image-wrapper">
        <img src="/pictures/maine.jpg" alt="Makanan Anjing Premium" class="product-image" />
      </div>
      <div class="product-details">
        <h2 class="product-name">Maine Coon</h2>
        <p class="product-text">
          Sebagai salah satu ras kucing paling populer di dunia, maine coon memiliki tubuh yang besar dengan sifat yang penyayang. 
          Mereka suka bermain dan sabar dengan manusia. Ras kucing ini kerap mendapatkan penghargaan sebagai “Kucing Domestik Terbesar”, 
          termasuk di Guinness World Record sebagai kucing terpanjang.Hal ini dapat dimaklumi mengingat rata-rata bobot seekor maine coon 
          bisa berkisar di antara angka 4 sampai 8 kilogram. Bahkan, ada yang beratnya mencapai 15 kilogram!Ciri fisik lain dari kucing ini 
          adalah cakar bulat besar, ekor panjang, dan memiliki warna bulu yang cenderung gelap.
        </p>
        <button class="product-button">View Details</button>
      </div>
    </div>

    <div class="product-item">
      <div class="product-image-wrapper">
        <img src="/pictures/nurwegian.jpg" alt="Mainan Kucing Interaktif" class="product-image" />
      </div>
      <div class="product-details">
        <h2 class="product-name">Norwegian Forest Cat</h2>
        <p class="product-text">
          Sebagai salah satu ras kucing terbesar di dunia, norwegian forest cat memiliki penampilan seperti kucing liar. Mereka memiliki 
          kecenderungan untuk bermain di tempat tinggi seperti di atas lemari.Kucing ini tergolong santai, penyayang, dan tidak mudah stres. 
          Mereka memiliki lapisan ganda unik yang mencakup lapisan bawah yang tebal dan mantel panjang yang halus seperti sutra.Selain itu, 
          mereka bisa menikmati pelukan dari pemiliknya. Bobotnya berkisar di angka 3.6 sampai 10 kilogram. Di negara asalnya, Norwegia, mereka 
          disebut sebagai skogkatt.
        </p>
        <button class="product-button">View Details</button>
      </div>
    </div>

    <div class="product-item">
      <div class="product-image-wrapper">
        <img src="/pictures/ragdoll.jpg" alt="Aksesoris Kandang Burung" class="product-image" />
      </div>
      <div class="product-details">
        <h2 class="product-name"> Ragdoll</h2>
        <p class="product-text">
          Ragdoll terkenal sebagai kucing peliharaan yang jinak, tenang, dan akan mendadak lemas jika digendong. Kucing yang satu ini suka bersama
          manusia dan bisa akur dengan anak-anak. Kucing ini cocok untuk orang yang mencari kucing pendiam dan penurut. Keunikan terbesar dari 
          ragdoll adalah matanya yang oval dan kerap berwarna biru. Untuk bobotnya sendiri, kisarannya adalah 3.6 sampai 9 kilogram.
        </p>
        <button class="product-button">View Details</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PetShopView',
};
</script>

<style scoped>
@import '../Style/Pet.css';
</style>