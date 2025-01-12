"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useUser } from "@/hooks/useUser";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { ApiError } from "@/lib/apiBase";

export default function SettingsPage() {
  const { t } = useTranslation();
  const { user, updateProfile } = useUser();
  const [username, setUsername] = useState(user?.username || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user?.avatar || null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      if (username !== user?.username) {
        formData.append("username", username);
      }
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }
      if (formData.has("username") || formData.has("avatar")) {
        const updatedUser = await updateProfile(formData);
        if (updatedUser.avatar) {
          setAvatarPreview(updatedUser.avatar);
        }
        toast.success(t("settings.updateSuccess"));
      } else {
        toast.info(t("settings.noChanges"));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      let errorMessage = t("settings.updateError");
      if (error instanceof ApiError) {
        errorMessage = `${t("settings.apiError")} (${error.status}): ${error.message}`;
        console.error("API Error details:", error.status, error.data);
      } else if (error instanceof Error) {
        errorMessage = `${t("settings.error")}: ${error.message}`;
      }
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{t("settings.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">{t("settings.username")}</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t("settings.usernamePlaceholder")}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("settings.avatar")}</Label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${
                  isDragActive ? "border-primary" : "border-gray-300"
                }`}
              >
                <input {...getInputProps()} />
                {avatarPreview ? (
                  <Avatar className="w-32 h-32 mx-auto">
                    <AvatarImage src={avatarPreview} alt={username} />
                    <AvatarFallback>
                      {username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <p>{t("settings.dropzoneText")}</p>
                )}
              </div>
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t("settings.saving") : t("settings.saveButton")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
