import ProductGrid from "@/components/product-grid";

export default function Home() {
  return (
    <main>
    <section className="home" id="home">
        <div className="home-img container">
            <img src="images/home.png" alt=""/>
        </div>
    </section>
    <section className="products container" id="products">
        <h2 className="heading">Discover Product</h2>
        <ProductGrid/>
    </section>
    </main>
  );
}
