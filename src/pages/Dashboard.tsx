
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import FileUpload from "@/components/FileUpload";
import MarketOverview from "@/components/MarketOverview";
import StockWatchlist from "@/components/StockWatchlist";
import StockSelector from "@/components/StockSelector";
import TopMovers from "@/components/TopMovers";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return null; // Don't render anything while checking authentication
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - Indian Stock Market Platform</title>
      </Helmet>
      <div className="container py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Indian Stock Market Platform</h1>
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Logout
          </button>
        </div>

        <Tabs defaultValue="watchlist" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-5 md:grid-cols-6 md:inline-flex">
            <TabsTrigger value="overview">Market Overview</TabsTrigger>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
            <TabsTrigger value="top-movers">Top Movers</TabsTrigger>
            <TabsTrigger value="stock-selector">Stock Selector</TabsTrigger>
            <TabsTrigger value="upload">Upload Data</TabsTrigger>
            <TabsTrigger value="index-analysis" className="hidden md:flex">Index Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="pt-6">
            <MarketOverview />
          </TabsContent>
          
          <TabsContent value="watchlist" className="pt-6">
            <StockWatchlist />
          </TabsContent>
          
          <TabsContent value="top-movers" className="pt-6">
            <TopMovers />
          </TabsContent>
          
          <TabsContent value="stock-selector" className="pt-6">
            <StockSelector />
          </TabsContent>
          
          <TabsContent value="upload" className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload CSV Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <FileUpload 
                    onUploadSuccess={(data) => {
                      toast({
                        title: "Upload Successful",
                        description: `Uploaded ${data.length} records.`,
                      });
                    }} 
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Upload Custom Index</CardTitle>
                </CardHeader>
                <CardContent>
                  <FileUpload 
                    fileType="index" 
                    onUploadSuccess={(data) => {
                      toast({
                        title: "Index Uploaded",
                        description: `Custom index with ${data.length} components loaded.`,
                      });
                    }} 
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="index-analysis" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Index Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  View performance metrics for major Indian indices and your custom indices.
                </p>
                <div className="grid gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <p className="font-medium">Your custom indices will appear here after upload.</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Dashboard;
