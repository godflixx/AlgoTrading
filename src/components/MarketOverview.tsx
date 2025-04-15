import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Label } from "@/components/ui/label";
import { ArrowDown, ArrowUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IndexDetails from "./IndexDetails";

const getMockMarketData = () => {
  const indices = [
    { name: "NIFTY 50", value: 24198.30, change: 0.72, color: "#22c55e" },
    { name: "SENSEX", value: 79433.65, change: 0.68, color: "#22c55e" },
    { name: "NIFTY Bank", value: 49651.25, change: -0.31, color: "#ef4444" },
    { name: "NIFTY IT", value: 35786.40, change: 1.45, color: "#22c55e" },
  ];

  const chartData = Array.from({ length: 20 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (19 - i));
    
    return {
      date: date.toLocaleDateString("en-US", { month: 'short', day: 'numeric' }),
      nifty50: 24000 + Math.random() * 400,
      sensex: 79000 + Math.random() * 1200,
      banknifty: 49200 + Math.random() * 800,
    };
  });

  const candleData = Array.from({ length: 20 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (19 - i));
    
    const basePrice = 23800 + (i * 50);
    const volatility = Math.random() * 150;
    
    const openPrice = basePrice + (Math.random() * volatility - volatility/2);
    const closePrice = openPrice + (Math.random() * volatility - volatility/2);
    
    const highPrice = Math.max(openPrice, closePrice) + (Math.random() * volatility/2);
    const lowPrice = Math.min(openPrice, closePrice) - (Math.random() * volatility/2);
    
    return {
      date: date.toLocaleDateString("en-US", { month: 'short', day: 'numeric' }),
      open: openPrice,
      high: highPrice,
      low: lowPrice,
      close: closePrice,
      volume: Math.round(Math.random() * 1000000),
      increase: closePrice > openPrice,
      color: closePrice > openPrice ? "#0EA5E9" : "#F97316",
      wickColor: closePrice > openPrice ? "#0EA5E9" : "#F97316",
    };
  });

  return { indices, chartData, candleData };
};

const MarketOverview = () => {
  const [marketData, setMarketData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      setTimeout(() => {
        setMarketData(getMockMarketData());
        setIsLoading(false);
      }, 1000);
    };

    fetchData();
    
    const intervalId = setInterval(fetchData, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return (
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="animate-pulse bg-muted h-6 w-48 rounded"></CardTitle>
            <CardDescription className="animate-pulse bg-muted h-5 w-72 rounded"></CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] animate-pulse bg-muted rounded"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Indian Market Overview</CardTitle>
          <CardDescription>
            Real-time performance of major Indian market indices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {marketData.indices.map((index: any) => (
                <Card key={index.name}>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <Label>{index.name}</Label>
                      <div className="flex items-baseline justify-between">
                        <div className="text-2xl font-bold">{index.value.toLocaleString()}</div>
                        <div className={`flex items-center ${index.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {index.change >= 0 ? <ArrowUp className="mr-1 h-4 w-4" /> : <ArrowDown className="mr-1 h-4 w-4" />}
                          {Math.abs(index.change)}%
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <ChartContainer
              config={{
                nifty50: {
                  label: "NIFTY 50",
                  color: "#22c55e"
                },
                sensex: {
                  label: "SENSEX",
                  color: "#3b82f6"
                },
                banknifty: {
                  label: "NIFTY Bank",
                  color: "#f59e0b"
                }
              }}
            >
              <ResponsiveContainer width="100%" height={350}>
                <LineChart
                  data={marketData.chartData}
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={(value) => value.toLocaleString()} />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(label) => `Date: ${label}`}
                      />
                    }
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="nifty50"
                    stroke="#22c55e"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                    dot={false}
                    name="NIFTY 50"
                  />
                  <Line
                    type="monotone"
                    dataKey="sensex"
                    stroke="#3b82f6"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                    dot={false}
                    name="SENSEX"
                  />
                  <Line
                    type="monotone"
                    dataKey="banknifty"
                    stroke="#f59e0b"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                    dot={false}
                    name="NIFTY Bank"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <IndexDetails />
      </div>
    </div>
  );
};

export default MarketOverview;
