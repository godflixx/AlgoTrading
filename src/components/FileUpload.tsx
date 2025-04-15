
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Upload } from "lucide-react";

interface FileUploadProps {
  onUploadSuccess: (data: any[]) => void;
  fileType?: "stock" | "index";
}

const FileUpload = ({ onUploadSuccess, fileType = "stock" }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setError(null);
    
    if (!selectedFile) {
      return;
    }
    
    if (selectedFile.type !== "text/csv") {
      setError("Please upload a CSV file");
      return;
    }
    
    setFile(selectedFile);
  };

  const parseCSV = (text: string): any[] => {
    const lines = text.split("\n");
    const headers = lines[0].split(",");
    
    return lines.slice(1)
      .filter(line => line.trim())
      .map(line => {
        const values = line.split(",");
        const entry: Record<string, string> = {};
        
        headers.forEach((header, i) => {
          entry[header.trim()] = values[i]?.trim() || "";
        });
        
        return entry;
      });
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const text = await file.text();
      const data = parseCSV(text);
      
      // Simulate processing time
      setTimeout(() => {
        setIsUploading(false);
        
        // Validate data based on file type
        if (fileType === "stock" && (!data[0]?.symbol || !data[0]?.price)) {
          setError("CSV must include symbol and price columns");
          return;
        }
        
        if (fileType === "index" && (!data[0]?.symbol || !data[0]?.weight)) {
          setError("Index CSV must include symbol and weight columns");
          return;
        }

        // Store data in localStorage (temporary solution)
        const storageKey = fileType === "stock" ? "uploadedStocks" : "customIndices";
        localStorage.setItem(storageKey, JSON.stringify(data));
        
        onUploadSuccess(data);
        setFile(null);
        // Reset file input
        const fileInput = document.getElementById("csv-upload") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      }, 1000);
    } catch (err) {
      setIsUploading(false);
      setError("Error parsing CSV file. Check the file format.");
      console.error("CSV parsing error:", err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="csv-upload" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {fileType === "stock" ? "Upload Stock Data" : "Upload Index Components"}
        </label>
        <Input
          id="csv-upload"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="cursor-pointer"
        />
        <p className="text-xs text-muted-foreground">
          {fileType === "stock" 
            ? "CSV should include columns: symbol,price,change,volume" 
            : "CSV should include columns: symbol,weight,name"}
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm">
          {file ? `Selected: ${file.name}` : "No file selected"}
        </p>
        <Button 
          onClick={handleUpload} 
          disabled={!file || isUploading}
        >
          {isUploading ? "Processing..." : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;
