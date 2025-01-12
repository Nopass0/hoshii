import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LineType } from "@/types";

type CardLineProps = {
  line: LineType;
};

const CardLine: React.FC<CardLineProps> = ({ line }) => {
  if (line.type !== "card") return null;

  return (
    <motion.div
      className={`${line.backgroundColor ? `bg-${line.backgroundColor}` : ""}`}
      style={{
        padding: line.padding || "0",
        marginBottom: line.marginBottom || "0",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-sm mx-auto">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="text-4xl font-bold">{line.mainContent}</div>
          {line.secondaryContent && (
            <>
              <Separator className="my-4" />
              <div className="text-lg">{line.secondaryContent}</div>
            </>
          )}
        </CardContent>
        {line.footer && (
          <CardFooter>
            <p>{line.footer}</p>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};

export default CardLine;
