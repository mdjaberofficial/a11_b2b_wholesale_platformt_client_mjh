import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Fade } from 'react-awesome-reveal';
import { Typewriter } from 'react-simple-typewriter';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Banner = () => {
  return (
    <div className="w-full mt-4 rounded-xl overflow-hidden z-0">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="h-[400px] sm:h-[500px] w-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="w-full h-full bg-cover bg-center flex items-center justify-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8ed7c1590f?q=80&w=1200&auto=format&fit=crop')" }}>
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="relative z-10 text-center text-white px-4">
              <Fade direction="down" duration={1000}>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 min-h-[80px]">
                  Source Wholesale{' '}
                  <span className="text-primary">
                    <Typewriter
                      words={['Electronics', 'Apparel', 'Machinery', 'Gadgets']}
                      loop={true}
                      cursor
                      cursorStyle='_'
                      typeSpeed={70}
                      deleteSpeed={50}
                      delaySpeed={1500}
                    />
                  </span>
                </h1>
                <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
                  Get up to 40% off on wholesale orders of premium goods. Minimum order quantities apply.
                </p>
                <button className="btn btn-primary">Shop Now</button>
              </Fade>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="w-full h-full bg-cover bg-center flex items-center justify-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop')" }}>
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="relative z-10 text-center text-white px-4">
              <Fade direction="up" duration={1000}>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Premium Apparel Sourcing</h1>
                <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">Connect directly with top-tier clothing manufacturers. Restock your retail store with high-margin fashion goods.</p>
                <button className="btn btn-secondary">Explore Apparel</button>
              </Fade>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="w-full h-full bg-cover bg-center flex items-center justify-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop')" }}>
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="relative z-10 text-center text-white px-4">
              <Fade duration={1500}>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Heavy Machinery & Tools</h1>
                <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">Industrial-grade equipment for your manufacturing needs. Exclusive wholesale pricing for verified B2B buyers.</p>
                <button className="btn btn-accent">View Machinery</button>
              </Fade>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;