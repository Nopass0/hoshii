import React from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LineType } from "@/types";

type CarouselLineProps = {
  line: LineType;
};

const CarouselLine: React.FC<CarouselLineProps> = ({ line }) => {
  if (line.type !== "carousel") return null;

  return (
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
      <Carousel className="w-full max-w-xs mx-auto">
        <CarouselContent>
          {line.images.map((img, imgIndex) => (
            <CarouselItem key={imgIndex}>
              <div className="p-1">
                <motion.img
                  src={img.src}
                  alt={`carousel-image-${imgIndex}`}
                  className="w-full h-auto object-cover rounded-md"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </motion.div>
  );
};

export default CarouselLine;
