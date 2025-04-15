import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDown, ArrowUp } from "lucide-react";

interface Mover {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

const TopMovers = () => {
  const [gainers, setGainers] = useState<Mover[]>([]);
  const [losers, setLosers] = useState<Mover[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch top movers
    const fetchData = () => {
      setLoading(true);
      
      // Generate mock data for Indian stocks
      setTimeout(() => {
        // Indian stock symbols
        const indianStockSymbols = [
          { symbol: "TATASTEEL", name: "Tata Steel Ltd." },
          { symbol: "WIPRO", name: "Wipro Ltd." },
          { symbol: "ADANIPORTS", name: "Adani Ports & SEZ Ltd." },
          { symbol: "ONGC", name: "Oil & Natural Gas Corporation Ltd." },
          { symbol: "HINDALCO", name: "Hindalco Industries Ltd." },
          { symbol: "TITAN", name: "Titan Company Ltd." },
          { symbol: "AXISBANK", name: "Axis Bank Ltd." },
          { symbol: "M&M", name: "Mahindra & Mahindra Ltd." },
          { symbol: "SUNPHARMA", name: "Sun Pharmaceutical Industries Ltd." },
          { symbol: "BAJAJFINSV", name: "Bajaj Finserv Ltd." },
          { symbol: "DRREDDY", name: "Dr. Reddy's Laboratories Ltd." },
          { symbol: "ASIANPAINT", name: "Asian Paints Ltd." },
          { symbol: "HCLTECH", name: "HCL Technologies Ltd." },
          { symbol: "NTPC", name: "NTPC Ltd." },
          { symbol: "MARUTI", name: "Maruti Suzuki India Ltd." }
        ];
        
        const allStocks: Mover[] = indianStockSymbols.map((stock, i) => {
          const price = 500 + Math.random() * 2500;
          const changePercent = (Math.random() * 10) - 5; // -5% to +5%
          const change = price * (changePercent / 100);
          
          return {
            symbol: stock.symbol,
            name: stock.name,
            price,
            change,
            changePercent,
            volume: Math.floor(Math.random() * 10000000),
          };
        });
        
        // Sort by change percentage
        allStocks.sort((a, b) => b.changePercent - a.changePercent);
        
        // Split into gainers and losers
        const topGainers = allStocks.filter(stock => stock.changePercent > 0).slice(0, 5);
        const topLosers = allStocks.filter(stock => stock.changePercent < 0).slice(-5).reverse();
        
        setGainers(topGainers);
        setLosers(topLosers);
        setLoading(false);
      }, 1000);
    };

    fetchData();
    
    // Refresh every minute
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const renderMoversList = (movers: Mover[], isPosChange: boolean) => {
    if (loading) {
      return (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex justify-between py-2 border-b border-border/50">
              <div className="space-y-1">
                <div className="h-4 w-20 animate-pulse rounded bg-muted"></div>
                <div className="h-3 w-32 animate-pulse rounded bg-muted"></div>
              </div>
              <div className="space-y-1">
                <div className="h-4 w-16 animate-pulse rounded bg-muted"></div>
                <div className="h-3 w-12 animate-pulse rounded bg-muted"></div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {movers.map((stock) => (
          <div key={stock.symbol} className="flex justify-between py-2 border-b border-border/50 last:border-0">
            <div>
              <div className="font-medium">{stock.symbol}</div>
              <div className="text-sm text-muted-foreground">{stock.name}</div>
            </div>
            <div className="text-right">
              <div>₹{stock.price.toFixed(2)}</div>
              <div className={isPosChange ? "text-green-500" : "text-red-500"} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                {isPosChange ? (
                  <ArrowUp className="inline-block mr-1 h-3 w-3" />
                ) : (
                  <ArrowDown className="inline-block mr-1 h-3 w-3" />
                )}
                {Math.abs(stock.changePercent).toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Movers</CardTitle>
        <CardDescription>
          Today's best performing and worst performing Indian stocks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="gainers">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
            <TabsTrigger value="losers">Top Losers</TabsTrigger>
          </TabsList>
          <TabsContent value="gainers" className="pt-4">
            {renderMoversList(gainers, true)}
          </TabsContent>
          <TabsContent value="losers" className="pt-4">
            {renderMoversList(losers, false)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TopMovers;
