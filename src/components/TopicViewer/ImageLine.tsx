import React from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LineType } from "@/types";

type ImageLineProps = {
  line: LineType;
};

const ImageLine: React.FC<ImageLineProps> = ({ line }) => {
  if (line.type !== "image") return null;

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
      <div className="flex flex-col items-center">
        {line.openFullscreen ? (
          <Dialog>
            <DialogTrigger asChild>
              <motion.div
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              >
                <img
                  src={line.image}
                  alt="cover"
                  className="object-cover rounded-md cursor-pointer"
                  style={{
                    width: line.width ? `${line.width}px` : "auto",
                    height: line.height ? `${line.height}px` : "auto",
                  }}
                />
              </motion.div>
            </DialogTrigger>
            <DialogContent className="max-w-5xl p-0">
              <img
                src={line.image}
                alt="fullscreen"
                className="w-full h-auto object-contain rounded-lg"
              />
            </DialogContent>
          </Dialog>
        ) : (
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3 },
            }}
          >
            <img
              src={line.image}
              alt="cover"
              className="object-cover rounded-md"
              style={{
                width: line.width ? `${line.width}px` : "auto",
                height: line.height ? `${line.height}px` : "auto",
              }}
            />
          </motion.div>
        )}
        {line.caption && (
          <span className="text-sm text-muted-foreground mt-2">
            {line.caption}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default ImageLine;
