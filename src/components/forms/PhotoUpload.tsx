import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import { useResume } from '@/contexts/ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const PhotoUpload = () => {
  const { session } = useAuth();
  const { updatePhotoUrl } = useResume();
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }
      if (!session?.user) {
        throw new Error('You must be logged in to upload an image.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      // This is the corrected line
      const filePath = `${session.user.id}/${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('profile-photos')
        .upload(filePath, file, { upsert: false }); // Set upsert to false to avoid replacing folder

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('profile-photos')
        .getPublicUrl(filePath);

      if (data) {
        updatePhotoUrl(data.publicUrl);
      }
      
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
        <Label htmlFor="photo-upload">Profile Photo</Label>
        <Input id="photo-upload" type="file" accept="image/*" onChange={handleUpload} disabled={uploading} />
        {uploading && <p className="text-sm text-muted-foreground animate-pulse">Uploading...</p>}
    </div>
  );
};

export default PhotoUpload;