
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, File, Upload, Link as LinkIcon, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function KnowledgeUpload() {
  const [files, setFiles] = useState<{ name: string; size: string }[]>([]);
  const [websites, setWebsites] = useState<string[]>([]);
  const [newWebsite, setNewWebsite] = useState("");
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    const newFiles = Array.from(e.target.files).map(file => ({
      name: file.name,
      size: formatBytes(file.size)
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    toast({
      title: "Files added",
      description: `Added ${newFiles.length} file(s) to knowledge base.`,
    });
    
    // Reset the input for future uploads
    e.target.value = "";
  };
  
  const handleAddWebsite = () => {
    if (!newWebsite) return;
    
    // Basic URL validation
    try {
      new URL(newWebsite);
      setWebsites(prev => [...prev, newWebsite]);
      setNewWebsite("");
      toast({
        title: "Website added",
        description: `${newWebsite} added to knowledge sources.`,
      });
    } catch (err) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid website URL.",
        variant: "destructive",
      });
    }
  };
  
  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };
  
  const removeWebsite = (index: number) => {
    setWebsites(websites.filter((_, i) => i !== index));
  };
  
  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle>Knowledge Base</CardTitle>
        <CardDescription>
          Add information sources for your agent to learn from.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="files">
          <TabsList className="mb-4 grid grid-cols-3">
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="websites">Websites</TabsTrigger>
            <TabsTrigger value="text">Direct Text</TabsTrigger>
          </TabsList>
          
          <TabsContent value="files" className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="files">Upload Files</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="files"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("files")?.click()}
                  className="w-full h-24 border-dashed flex flex-col gap-2"
                >
                  <Upload className="h-5 w-5" />
                  <span>Drag files here or click to upload</span>
                  <span className="text-xs text-muted-foreground">
                    PDF, DOCX, TXT, CSV up to 50MB
                  </span>
                </Button>
              </div>
            </div>
            
            {files.length > 0 && (
              <div className="space-y-2">
                <Label>Uploaded Files</Label>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between rounded-md border p-2">
                      <div className="flex items-center gap-2">
                        <File className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{file.name}</span>
                        <span className="text-xs text-muted-foreground">({file.size})</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="websites" className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="website">Add Website</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="website"
                  placeholder="https://example.com"
                  value={newWebsite}
                  onChange={(e) => setNewWebsite(e.target.value)}
                />
                <Button 
                  onClick={handleAddWebsite}
                  disabled={!newWebsite}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                The agent will crawl and index content from these websites
              </p>
            </div>
            
            {websites.length > 0 && (
              <div className="space-y-2">
                <Label>Added Websites</Label>
                <div className="space-y-2">
                  {websites.map((website, index) => (
                    <div key={index} className="flex items-center justify-between rounded-md border p-2">
                      <div className="flex items-center gap-2">
                        <LinkIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium overflow-hidden text-ellipsis">{website}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => removeWebsite(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="text" className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="direct-text">Add Knowledge Directly</Label>
              <Textarea
                id="direct-text"
                placeholder="Enter text, instructions, or knowledge that your agent should learn..."
                className="min-h-32"
              />
              <p className="text-xs text-muted-foreground">
                This text will be processed and added to your agent's knowledge base
              </p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add to Knowledge Base
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// Helper function to format file sizes
function formatBytes(bytes: number, decimals: number = 2) {
  if (bytes === 0) return "0 Bytes";
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
