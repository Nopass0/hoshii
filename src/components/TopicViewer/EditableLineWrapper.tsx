import React, { useState } from "react";
import { motion } from "framer-motion";
import { Edit2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LineType } from "@/types";

type EditableLineWrapperProps = {
  children: React.ReactNode;
  line: LineType;
  index: number;
  updateLine: (index: number, updatedLine: LineType) => void;
};

const EditableLineWrapper: React.FC<EditableLineWrapperProps> = ({
  children,
  line,
  index,
  updateLine,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLine, setEditedLine] = useState(line);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateLine(index, editedLine);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedLine(line);
    setIsEditing(false);
  };

  const renderEditForm = () => {
    return (
      <div className="space-y-4">
        <Textarea
          className="w-full p-2 border rounded"
          value={JSON.stringify(editedLine, null, 2)}
          onChange={(e) => {
            try {
              setEditedLine(JSON.parse(e.target.value));
            } catch (error) {
              console.error("Invalid JSON:", error);
            }
          }}
          rows={10}
        />
        <div className="flex justify-end space-x-2">
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
          <Button variant="outline" onClick={handleCancel}>
            <X className="mr-2 h-4 w-4" /> Cancel
          </Button>
        </div>
      </div>
    );
  };

  return (
    <motion.div className="relative group">
      {children}
      {!isEditing && (
        <Button
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          size="sm"
          onClick={handleEdit}
        >
          <Edit2 className="h-4 w-4" />
        </Button>
      )}
      {isEditing && renderEditForm()}
    </motion.div>
  );
};

export default EditableLineWrapper;
