import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import HeroSlider from "@/components/HeroSlider";
import AdBanner from "@/components/AdBanner";

export default function Home() {

  return (

    <div>

      {/* Top Featured News */}
      <HeroSection />

      {/* Category News Sections */}

      <CategorySection
        category="maharashtra"
        title="महाराष्ट्र"
      />

      <CategorySection
        category="politics"
        title="राजकारण"
      />

      <CategorySection
        category="sports"
        title="क्रीडा"
      />

      <CategorySection
        category="technology"
        title="टेक्नॉलॉजी"
      />
      <HeroSlider />

<CategorySection
category="maharashtra"
title="महाराष्ट्र"
/>
<HeroSlider />

<AdBanner
image="/ads/banner1.jpg"
link="https://example.com"
/>

<CategorySection
category="maharashtra"
title="महाराष्ट्र"
/>

<AdBanner
image="/ads/banner2.jpg"
link="https://example.com"
/>

<CategorySection
category="politics"
title="राजकारण"
/>
      



    </div>

  );

}