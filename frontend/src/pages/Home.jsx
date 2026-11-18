import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/shared/ProductCard';
import { getProducts } from '../api/client';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filterTab, setFilterTab] = useState('all');
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    getProducts().then(data => {
      if (data.products) setProducts(data.products);
    }).catch(console.error);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('CHIC15');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const trendingProducts = products.slice(0, 4);

  const filteredNewArrivals = products.filter(p => {
    if (filterTab === 'evening') return p.occasion?.includes('Evening Cocktail & Gala') || p.category === 'Dresses';
    if (filterTab === 'workwear') return p.occasion?.includes('Sleek Workwear Atelier') || p.category === 'Tops & Blouses' || p.category === 'Bottoms';
    if (filterTab === 'casual') return p.occasion?.includes('Everyday Elevated Minimal') || p.category === 'Co-ords';
    return true;
  });

  return (
    <div className="w-full pt-28 bg-surface">
      {/* 1. Editorial Hero Section */}
      <section className="relative w-full -mt-28 pt-28 pb-20 md:pb-32 overflow-hidden bg-surface-container-low">
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-32 right-0 w-[550px] h-[550px] rounded-full bg-secondary-fixed/40 blur-[130px] pointer-events-none" />
        <div className="absolute top-1/2 -left-40 w-[420px] h-[420px] rounded-full bg-secondary-container/10 blur-[100px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin pt-8 md:pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            {/* Text Column */}
            <div className="lg:col-span-6 space-y-space-md z-10">
              <div className="inline-flex items-center gap-space-xs px-3.5 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="font-label-sm text-label-sm uppercase tracking-widest font-bold">
                  Resort • Spring Summer 2025
                </span>
              </div>

              <h1 className="font-display-hero text-display-hero text-on-surface leading-[1.08]">
                Style That <br />
                <span className="italic font-normal text-secondary font-display-hero">Fits You.</span>
              </h1>

              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
                Discover stylish, comfortable, and confidence-boosting fashion crafted for every silhouette. From Italian linen to washed mulberry silk, designed to drape with poetic ease.
              </p>

              <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-space-sm px-8 py-3.5 rounded-full bg-primary text-on-primary font-label-lg text-label-lg tracking-wider hover:bg-on-surface-variant hover:scale-[1.02] active:scale-95 transition-all shadow-md group"
                >
                  <span>SHOP NOW</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>
                <a
                  href="#categories"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-surface-container-lowest text-on-surface font-label-lg text-label-lg tracking-wider hover:bg-surface-container-high hover:scale-[1.02] active:scale-95 transition-all shadow-sm"
                >
                  EXPLORE COLLECTION
                </a>
              </div>

              {/* Trust Markers */}
              <div className="pt-space-lg flex flex-wrap items-center gap-y-3 gap-x-6 text-on-surface-variant font-label-sm text-label-sm tracking-wide">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-secondary">eco</span>
                  <span>ETHICALLY SOURCED</span>
                </div>
                <span className="inline-block w-1 h-1 rounded-full bg-outline-variant" />
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-secondary">checkroom</span>
                  <span>INCLUSIVE SIZES 0–26</span>
                </div>
                <span className="inline-block w-1 h-1 rounded-full bg-outline-variant" />
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-secondary">local_shipping</span>
                  <span>FREE WORLDWIDE SHIPPING</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Montage */}
            <div className="lg:col-span-6 relative mt-6 lg:mt-0">
              <div className="grid grid-cols-12 gap-space-sm items-end">
                {/* Secondary Look Card */}
                <div className="col-span-5 relative group overflow-hidden rounded-xl shadow-lg bg-surface-container-lowest">
                  <div className="aspect-[3/4] w-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt="Modern blazer look"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYmLw8RbiE2rGz__Jqs2s5N3B_b2AMDY0ZopqdZ35fjEJ3I3DiuF821ZhXOQZMlrYS9B-SniBMMzwzjrlHhCl7DTqyP5mBDqaUIdmRqJM7-ij5vbp8sMqvzpRJkxfTCKwI3D38b4x3Oc7bjCISLzNGd64F1_6FzhthQsh2_C_PWQhZOKOvsKn7Edvv5cuLl4j8r0SbfFOd5iwWxBzJjN83TXFbmyopUvlFzUEHIc891-49a8_01lAkXw"
                    />
                  </div>
                  <div className="p-3 bg-surface-container-lowest/90 backdrop-blur-sm">
                    <p className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">L'Atelier Capsule</p>
                    <p className="font-title-editorial text-title-editorial text-on-surface">Structured Soft Blazer</p>
                    <p className="font-price-headline text-price-headline text-on-surface mt-0.5">$185</p>
                  </div>
                </div>

                {/* Primary Tall Hero Card */}
                <div className="col-span-7 relative group overflow-hidden rounded-xl shadow-xl bg-surface-container-lowest -mt-8">
                  <div className="aspect-[3/4.4] w-full overflow-hidden relative">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt="Florentine Pleated Maxi"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN4dcHv3L0E_-V2KLrYP9gvRvIysC1Iv87TscU45Tmsly2g89Ekza_Tp4svBwrr5uzE_CzPQG1pkivbU_xwSGB0_quHkKP26evhKtJtZ-kK5_TGOZWD73LR_3BLTLyR-QCdHldsFliBwgZ7SMd7m6tk-JSc3PH1OC9HS7P-bdlno6fhuwYeWSSa8C1pMsMbJZvYNs1MzfhHHMf2oaC7on3oWVIsb22VlVVY7pEgeiTF02ZTiqFYaeekw"
                    />
                    <div className="absolute top-4 right-4 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                      <span className="font-label-sm text-label-sm tracking-wider text-secondary uppercase font-bold">New Drop 01</span>
                    </div>
                  </div>
                  <div className="p-4 bg-surface-container-lowest flex items-center justify-between">
                    <div>
                      <p className="font-title-editorial text-title-editorial text-on-surface font-semibold">The Florentine Pleated Maxi</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Signature Silk Touch Blend</p>
                    </div>
                    <Link
                      to="/product/the-florentine-pleated-satin-maxi-dress"
                      aria-label="View Product"
                      className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">arrow_outward</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating Chic Badge Tag */}
              <div className="absolute -bottom-4 left-6 bg-surface-container-lowest/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg flex items-center gap-space-sm max-w-xs z-20">
                <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm uppercase tracking-wide text-secondary font-bold">Curated Fitting Room</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">98.4% True-to-Size Accuracy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Categories Grid */}
      <section className="w-full py-16 md:py-24 bg-surface" id="categories">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-12">
            <div className="space-y-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">The Wardrobe Repertoire</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Browse by Category</h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Explore iconic silhouettes engineered for seamless transitions from day to evening elegance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {/* 1. Dresses */}
            <Link to="/shop?category=Dresses" className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-surface-container-low flex flex-col aspect-[4/5]">
              <div className="absolute inset-0 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="Dresses"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuArjN7-hA-A1y4A6KJzNuJBq40HHWXBu92KzgIX4a3vzcPsdQbmUat_Jqhr-A9Ax_dzsivplKQQle1JCiTWJ5vpg1RmiChogFqv7lDgLm0TzuGq7EP7XJdWdr-W41u8h5O0s32i-36FyzQD4S7WlsXd5biLcymiMexUUrXFxpT2UJW0aSjocucevGA5nm_UwNacgJIZLyeqtsIvHIuBkR0Qwuwc3Qh-rfupz4VzrW4V1Mr6tI4MWxdVnw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/85 via-on-surface/20 to-transparent" />
              </div>
              <div className="relative mt-auto p-6 text-on-primary space-y-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary-fixed">84 Pieces</span>
                <h3 className="font-headline-sm text-headline-sm text-on-primary">Dresses</h3>
                <p className="font-body-sm text-body-sm text-on-primary/80">Flowing Silk, Satin & Linen Silhouettes</p>
                <div className="pt-2 flex items-center gap-1 font-label-md text-label-md tracking-wider uppercase text-secondary-fixed group-hover:translate-x-1 transition-transform">
                  <span>View Collection</span>
                  <span className="material-symbols-outlined text-[16px]">east</span>
                </div>
              </div>
            </Link>

            {/* 2. Tops & Blouses */}
            <Link to="/shop?category=Tops & Blouses" className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-surface-container-low flex flex-col aspect-[4/5]">
              <div className="absolute inset-0 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="Tops & Blouses"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAeIbzJlXbNGboXINrVRqQ0a5eEPjBM-Nwach16LDOYdLcg7qws9-A33qsOvcRn3lVDGDIPwGE8mYdNp_z9HZ4Q9rzcSjcrk8anxKo-JBeG-qmFInOHpWjQwXWYE6QyD4NW8zTnI5GQZWIEMjuAw-g3MKxF_c6F7fW18qWitgaVZByLG3ZYZE2TciNJU7bINaWocgkVX0OHxjMBH8jytQZT_K7XrLUeKkn5ItXJMgugqF026883u_zog"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/85 via-on-surface/20 to-transparent" />
              </div>
              <div className="relative mt-auto p-6 text-on-primary space-y-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary-fixed">52 Pieces</span>
                <h3 className="font-headline-sm text-headline-sm text-on-primary">Tops & Blouses</h3>
                <p className="font-body-sm text-body-sm text-on-primary/80">Modern Sculptural & Everyday Silks</p>
                <div className="pt-2 flex items-center gap-1 font-label-md text-label-md tracking-wider uppercase text-secondary-fixed group-hover:translate-x-1 transition-transform">
                  <span>View Collection</span>
                  <span className="material-symbols-outlined text-[16px]">east</span>
                </div>
              </div>
            </Link>

            {/* 3. Bottoms */}
            <Link to="/shop?category=Bottoms" className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-surface-container-low flex flex-col aspect-[4/5]">
              <div className="absolute inset-0 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="Bottoms"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-z3M_cyqyhuT4Wjfvqan7IHFGRk2jkfZz18V7cyJGrx3FAEHIh8gjNBS_PfwXr-ZpWcDR6j2jkWAqA_J0LzStgS2Nzm5sstXpZsYp2H6htM5e5zkIBAjezVzKuuXsFUg4qZQ49ki7Levwb4EqA5BplK-4x8RqOeAnOAaYnDYwDmwAl4J1khF2RuyJE6RIPF58pC0NmEw-xqEY9_vlXc-INsFNikiQle4t6i5kwmgcIJILhJLshTyXNw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/85 via-on-surface/20 to-transparent" />
              </div>
              <div className="relative mt-auto p-6 text-on-primary space-y-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary-fixed">46 Pieces</span>
                <h3 className="font-headline-sm text-headline-sm text-on-primary">Bottoms</h3>
                <p className="font-body-sm text-body-sm text-on-primary/80">Tailored High-Rise & Fluid Pleats</p>
                <div className="pt-2 flex items-center gap-1 font-label-md text-label-md tracking-wider uppercase text-secondary-fixed group-hover:translate-x-1 transition-transform">
                  <span>View Collection</span>
                  <span className="material-symbols-outlined text-[16px]">east</span>
                </div>
              </div>
            </Link>

            {/* 4. Co-ords */}
            <Link to="/shop?category=Co-ords" className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-surface-container-low flex flex-col aspect-[4/5]">
              <div className="absolute inset-0 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="Co-ords"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlJwkB45aA6SUymGRx8rIPhym8Xns9OVxZd4vZowO30bcf62A1fGCSF61urYlxn1Cu8ctwpZwgReYvcKFSnaYEcgwLlmB-XMLJZPg2QMX0ZOsFy5gzzzzWW7vVxCUQnlq4hU2MTF5uge6yS2i0bzgXYJlMSVmndv7VxS5YdfOrsm6yaGSu9zTWNMc3Hm5cevpChxwe3ERt9D_1vk_yYDRZ0mL3oGKKXKeUn063X3MI2bxhluxJ9hbGdg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/85 via-on-surface/20 to-transparent" />
              </div>
              <div className="relative mt-auto p-6 text-on-primary space-y-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary-fixed">38 Sets</span>
                <h3 className="font-headline-sm text-headline-sm text-on-primary">Co-ords</h3>
                <p className="font-body-sm text-body-sm text-on-primary/80">Effortless Two-Piece Statement Sets</p>
                <div className="pt-2 flex items-center gap-1 font-label-md text-label-md tracking-wider uppercase text-secondary-fixed group-hover:translate-x-1 transition-transform">
                  <span>View Collection</span>
                  <span className="material-symbols-outlined text-[16px]">east</span>
                </div>
              </div>
            </Link>

            {/* 5. Plus Size Atelier */}
            <Link to="/shop?category=Plus Size Atelier" className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-surface-container-low flex flex-col aspect-[4/5]">
              <div className="absolute inset-0 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="Plus Size Atelier"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9hUdvCVvZ5hxPK_1tlOnBFTBbOFU9JEarsCJBVC40vAvwX_6DRC9AmZYFQmNQFQQV_0eZ_HeriU6SAB4rmbox5gUjacvK-_pGMd3tOvXD8vlDzrCon-j3m1GJnQirGO8Mn8XDfErl62rdLcjh4IasKMVEnLmhKqv_eoSUb0HokuUq3rutqPdXCKME_RRaqB96miH11tofiUg6mtiREN9VO9ri_MJLBKGTkoA2mWP0smc1IhF4Swrk1A"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/85 via-on-surface/20 to-transparent" />
              </div>
              <div className="relative mt-auto p-6 text-on-primary space-y-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary-fixed">Sizes 14–26 Exclusive</span>
                <h3 className="font-headline-sm text-headline-sm text-on-primary">Plus Size Atelier</h3>
                <p className="font-body-sm text-body-sm text-on-primary/80">Curated Sculptural & Flattering Fits</p>
                <div className="pt-2 flex items-center gap-1 font-label-md text-label-md tracking-wider uppercase text-secondary-fixed group-hover:translate-x-1 transition-transform">
                  <span>View Collection</span>
                  <span className="material-symbols-outlined text-[16px]">east</span>
                </div>
              </div>
            </Link>

            {/* 6. New Arrivals */}
            <Link to="/shop?filter=new" className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-surface-container-low flex flex-col aspect-[4/5]">
              <div className="absolute inset-0 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="Resort 2025"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2TryldZOw3skSIXRayzGyuz41xqUB9mV7_9k11WnFlkpsHNFw4OyaArxPtwBeNn4UuPCmgok7ax1ONEC-ZhwwFz1QzL_a6QJmJ7p4riLF_8CJF_jHQgxh7hwyeWEM6Qz5HkIPPBS6XcDF1n6b-69Fu68yFFZq9Avjwsxau-KqRaxmGMpyinPxGH-67-sFG_RL4ukmu3Pj3Xz4n1jUd8-I6ry99tPZSm_RtC7iT2cMKExMRqvnOIp6iw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/85 via-on-surface/20 to-transparent" />
              </div>
              <div className="relative mt-auto p-6 text-on-primary space-y-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary-fixed">Just Landed</span>
                <h3 className="font-headline-sm text-headline-sm text-on-primary">Resort 2025</h3>
                <p className="font-body-sm text-body-sm text-on-primary/80">Fresh Runway Drop & Limited Editions</p>
                <div className="pt-2 flex items-center gap-1 font-label-md text-label-md tracking-wider uppercase text-secondary-fixed group-hover:translate-x-1 transition-transform">
                  <span>Discover Drops</span>
                  <span className="material-symbols-outlined text-[16px]">east</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Trending Now Section */}
      <section className="w-full py-16 md:py-24 bg-surface-container-low" id="trending">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-md mb-12">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Handpicked Essentials</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Trending Now</h2>
            </div>
            <div className="flex items-center gap-space-sm">
              <Link to="/shop" className="text-secondary font-label-md text-label-md uppercase tracking-wider hover:underline flex items-center gap-1">
                <span>View All</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {trendingProducts.map(p => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Promotional Banner (CHIC15) */}
      <section className="w-full py-12 md:py-20 bg-surface">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-surface-container-high">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
              {/* Left Image */}
              <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="Campaign Lookbook"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTDUnAp0NIqLjekLO-5tCdNPNiNUxvT3fsEFOADw9GUr9Kc73lcs1ZDaUPqfyUYxELyEkn16YPwZOEk-VRof41UL5ycLU66K35koMpp3bVyTUtQyLulanDLPA3J77Grn6RSyQYTP4cYRXx2s_Qsxlhl3_kyS2GzAzdBB7cteGBS32S6WuYaxijK3ipBPyzUsZfyBQpAyvIngfqPH8Mk5ZocsVN-kKKQsJEtdefeXNp5fSchKdY2uPbig"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-surface-container-high/90 hidden lg:block" />
                <div className="absolute bottom-6 left-6 bg-surface-container-lowest/80 backdrop-blur-md px-4 py-2 rounded-full hidden sm:flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                  <span className="font-label-sm text-label-sm tracking-wider uppercase text-on-surface">Couture Touch • Conscious Fabrication</span>
                </div>
              </div>

              {/* Right Content */}
              <div className="lg:col-span-5 p-8 md:p-12 lg:p-16 flex flex-col justify-center space-y-space-md bg-surface-container-high">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed w-fit">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest font-bold">Limited Seasonal Welcome</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface leading-tight">
                  New Season.<br />
                  <span className="italic text-secondary font-display-hero">New Style.</span> New You.
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  We design with intentional architecture: garments built to celebrate every curve, contour, and transition in your schedule. No compromises between sheer comfort and runway refinement.
                </p>

                {/* Voucher Box */}
                <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="space-y-0.5 text-center sm:text-left">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Claim 15% Off Your First Order</span>
                    <p className="font-headline-sm text-headline-sm tracking-widest text-on-surface font-mono">CHIC15</p>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-secondary active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {copiedCode ? 'check' : 'content_copy'}
                    </span>
                    <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-space-md pt-2">
                  <Link to="/shop" className="inline-flex items-center gap-2 font-label-lg text-label-lg uppercase tracking-wider text-on-surface hover:text-secondary transition-colors group">
                    <span>Shop The Campaign Lookbook</span>
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">east</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. New Arrivals with Filter Tabs */}
      <section className="w-full py-16 md:py-24 bg-surface" id="shop">
        <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-10">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Just In</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">New Arrivals</h2>
            </div>
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setFilterTab('all')}
                className={`px-5 py-2 rounded-full font-label-md text-label-md uppercase tracking-wider transition-all shadow-sm ${
                  filterTab === 'all' ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'
                }`}
              >
                All ({products.length})
              </button>
              <button
                onClick={() => setFilterTab('evening')}
                className={`px-5 py-2 rounded-full font-label-md text-label-md uppercase tracking-wider transition-all shadow-sm ${
                  filterTab === 'evening' ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'
                }`}
              >
                Cocktail & Evening
              </button>
              <button
                onClick={() => setFilterTab('workwear')}
                className={`px-5 py-2 rounded-full font-label-md text-label-md uppercase tracking-wider transition-all shadow-sm ${
                  filterTab === 'workwear' ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'
                }`}
              >
                Workwear Chic
              </button>
              <button
                onClick={() => setFilterTab('casual')}
                className={`px-5 py-2 rounded-full font-label-md text-label-md uppercase tracking-wider transition-all shadow-sm ${
                  filterTab === 'casual' ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'
                }`}
              >
                Weekend Casual
              </button>
            </div>
          </div>

          {/* New Arrivals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {filteredNewArrivals.slice(0, 8).map(p => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

