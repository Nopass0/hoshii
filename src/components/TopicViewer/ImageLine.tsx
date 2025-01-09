import React from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { LineType } from "@/types";

type ImageLineProps = {
  line: LineType;
};

const ImageLine: React.FC<ImageLineProps> = ({ line }) => (
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
    {line.type === "image" && (
      <div className="flex flex-col items-center">
        {line.openFullscreen ? (
          <Dialog>
            <DialogTrigger asChild>
              <motion.img
                src={line.image}
                alt="cover"
                className="object-cover rounded-md cursor-pointer"
                whileHover={{
                  borderWidth: 4,
                  transition: { duration: 0.3 },
                }}
                style={{
                  width: line.width || "auto",
                  height: line.height || "auto",
                  border: "2px solid transparent",
                }}
              />
            </DialogTrigger>
            <DialogContent className="rounded-lg p-0 m-0 max-w-5xl">
              <motion.img
                src={line.image}
                alt="cover"
                className="object-contain rounded-lg w-full h-full max-h-screen"
              />
            </DialogContent>
          </Dialog>
        ) : (
          <motion.img
            src={line.image}
            alt="cover"
            className="object-cover rounded-md hover:cursor-pointer hover:border-2
            border-red-100"
            style={{
              width: line.width || "auto",
              height: line.height || "auto",
              border: "2px solid transparent",
            }}
          />
        )}
        {line.caption && (
          <span className="text-sm text-secondary-foreground mt-1">
            {line.caption}
          </span>
        )}
      </div>
    )}
  </motion.div>
);

export default ImageLine;
