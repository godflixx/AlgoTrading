
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDown, ArrowUp, Search, RefreshCw, LineChart, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StockChart from "./StockChart";
import { useToast } from "@/hooks/use-toast";

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
  bid: number;
  ask: number;
  lastUpdated: Date;
  changes: {
    day1: number;
    day2: number;
    day3: number;
    day5: number;
    day10: number;
    day20: number;
  };
}

const getMockStocks = (): StockData[] => {
  const baseStocks = [
    { symbol: "RELIANCE", name: "Reliance Industries Ltd." },
    { symbol: "TCS", name: "Tata Consultancy Services Ltd." },
    { symbol: "HDFCBANK", name: "HDFC Bank Ltd." },
    { symbol: "INFY", name: "Infosys Ltd." },
    { symbol: "HINDUNILVR", name: "Hindustan Unilever Ltd." },
    { symbol: "BHARTIARTL", name: "Bharti Airtel Ltd." },
    { symbol: "ICICIBANK", name: "ICICI Bank Ltd." },
    { symbol: "SBIN", name: "State Bank of India" },
    { symbol: "LT", name: "Larsen & Toubro Ltd." },
    { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank Ltd." }
  ];

  const uploadedData = localStorage.getItem("uploadedStocks");
  const customStocks = uploadedData ? JSON.parse(uploadedData) : [];

  return [...baseStocks, ...customStocks].map(stock => {
    const price = parseFloat((500 + Math.random() * 2500).toFixed(2));
    const change = parseFloat((Math.random() * 4 - 2).toFixed(2));
    const bidAskSpread = price * 0.0005;

    const generateChange = (days: number) => {
      const volatilityFactor = Math.sqrt(days) * 0.8;
      return parseFloat((Math.random() * volatilityFactor * 2 - volatilityFactor).toFixed(2));
    };

    return {
      ...stock,
      symbol: stock.symbol?.toUpperCase() || "UNKNOWN",
      name: stock.name || `Stock ${stock.symbol}`,
      price,
      change,
      volume: Math.floor(Math.random() * 10000000),
      bid: parseFloat((price - bidAskSpread).toFixed(2)),
      ask: parseFloat((price + bidAskSpread).toFixed(2)),
      lastUpdated: new Date(),
      changes: {
        day1: change,
        day2: generateChange(2),
        day3: generateChange(3),
        day5: generateChange(5),
        day10: generateChange(10),
        day20: generateChange(20),
      }
    };
  });
};

const StockWatchlist = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<StockData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [isChartOpen, setIsChartOpen] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const { toast } = useToast();

  useEffect(() => {
    loadStocks();
    
    const intervalId = setInterval(refreshStocks, 10000);
    
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    filterStocks();
  }, [stocks, searchQuery]);

  const loadStocks = () => {
    const newStocks = getMockStocks();
    setStocks(newStocks);
  };

  const refreshStocks = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadStocks();
      setLastUpdateTime(new Date());
      setRefreshing(false);
    }, 500);
  };

  const filterStocks = () => {
    let result = [...stocks];
    
    if (searchQuery) {
      result = result.filter(stock => 
        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredStocks(result);
  };

  const openStockChart = (stock: StockData) => {
    setSelectedStock(stock);
    setIsChartOpen(true);
    console.log("Opening chart for", stock.symbol);
  };

  const getHeatmapColor = (change: number) => {
    if (change > 0) return "bg-green-500 dark:bg-green-600 text-white";
    if (change < 0) return "bg-red-500 dark:bg-red-600 text-white";
    return "bg-neutral-200 dark:bg-neutral-700";
  };

  const formatChange = (change: number) => {
    return (
      <div className="flex items-center justify-center">
        {Math.abs(change).toFixed(2)}%
      </div>
    );
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Watchlist</CardTitle>
        <CardDescription>
          Monitor real-time stock prices with performance heatmap
        </CardDescription>
        <div className="text-sm text-muted-foreground flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          Last updated: {formatDateTime(lastUpdateTime)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by symbol or name..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={refreshStocks}
                disabled={refreshing}
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
                <span className="sr-only">Refresh</span>
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Symbol</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                  <TableHead className="text-center">1D</TableHead>
                  <TableHead className="text-center">2D</TableHead>
                  <TableHead className="text-center">3D</TableHead>
                  <TableHead className="text-center">5D</TableHead>
                  <TableHead className="text-center">10D</TableHead>
                  <TableHead className="text-center">20D</TableHead>
                  <TableHead className="w-[60px] text-center">Chart</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStocks.length > 0 ? (
                  filteredStocks.map((stock) => (
                    <TableRow key={stock.symbol}>
                      <TableCell className="font-medium">{stock.symbol}</TableCell>
                      <TableCell className="hidden sm:table-cell">{stock.name}</TableCell>
                      <TableCell className="text-right">₹{stock.price.toLocaleString()}</TableCell>
                      <TableCell className={`text-right ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        <div className="flex items-center justify-end">
                          {stock.change >= 0 ? <ArrowUp className="mr-1 h-4 w-4" /> : <ArrowDown className="mr-1 h-4 w-4" />}
                          {Math.abs(stock.change)}%
                        </div>
                      </TableCell>
                      <TableCell className={`${getHeatmapColor(stock.changes.day1)}`}>
                        {formatChange(stock.changes.day1)}
                      </TableCell>
                      <TableCell className={`${getHeatmapColor(stock.changes.day2)}`}>
                        {formatChange(stock.changes.day2)}
                      </TableCell>
                      <TableCell className={`${getHeatmapColor(stock.changes.day3)}`}>
                        {formatChange(stock.changes.day3)}
                      </TableCell>
                      <TableCell className={`${getHeatmapColor(stock.changes.day5)}`}>
                        {formatChange(stock.changes.day5)}
                      </TableCell>
                      <TableCell className={`${getHeatmapColor(stock.changes.day10)}`}>
                        {formatChange(stock.changes.day10)}
                      </TableCell>
                      <TableCell className={`${getHeatmapColor(stock.changes.day20)}`}>
                        {formatChange(stock.changes.day20)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => openStockChart(stock)}
                        >
                          <LineChart className="h-4 w-4 text-primary" />
                          <span className="sr-only">View chart</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={11} className="h-24 text-center">
                      No stocks found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Last updated: {formatDateTime(lastUpdateTime)}
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 mr-1 bg-green-500 rounded-sm"></div>
                <span>Positive Change</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 mr-1 bg-red-500 rounded-sm"></div>
                <span>Negative Change</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <Dialog open={isChartOpen} onOpenChange={setIsChartOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>
              {selectedStock?.symbol} - {selectedStock?.name}
            </DialogTitle>
            <DialogDescription>
              Live price data - ₹{selectedStock?.price.toFixed(2)}
              <span className={selectedStock?.change && selectedStock.change >= 0 ? 'text-green-500 ml-2' : 'text-red-500 ml-2'}>
                {selectedStock?.change && selectedStock.change >= 0 ? '+' : ''}{selectedStock?.change}%
              </span>
            </DialogDescription>
            <div className="text-xs text-muted-foreground mt-1 flex items-center">
              <Clock className="h-3 w-3 mr-1" /> 
              Last updated: {selectedStock && formatDateTime(selectedStock.lastUpdated)}
            </div>
          </DialogHeader>
          <div className="mt-6 h-[340px] overflow-hidden">
            {selectedStock && (
              <StockChart 
                symbol={selectedStock.symbol} 
                data={[]} 
                color={selectedStock.change >= 0 ? "#22c55e" : "#ef4444"} 
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default StockWatchlist;
