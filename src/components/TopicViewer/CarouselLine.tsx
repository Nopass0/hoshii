import React from "react";
import { motion } from "framer-motion";
import { Carousel } from "@/components/ui/carousel";
import { LineType } from "@/types";

type CarouselLineProps = {
  line: LineType;
};

const CarouselLine: React.FC<CarouselLineProps> = ({ line }) => (
  <motion.div
    className={`flex flex-col gap-2 ${line.backgroundColor ? `bg-${line.backgroundColor}` : ""}`}
    style={{
      padding: line.padding || "0",
      color: line.color || "inherit",
      marginBottom: line.marginBottom || "0",
    }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {line.type === "carousel" && (
      <div className="mb-4">
        <Carousel>
          {line.images.map((img, imgIndex) => (
            <div key={imgIndex} className="relative">
              <motion.img
                src={img.src}
                alt={`carousel-image-${imgIndex}`}
                className="object-cover rounded-md"
                style={{ width: "100%", height: "300px" }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              />
            </div>
          ))}
        </Carousel>
      </div>
    )}
  </motion.div>
);

export default CarouselLine;
