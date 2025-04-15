import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; 
import { Button } from "@/components/ui/button";
import { Search, RefreshCw } from "lucide-react";
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
}

const StockSelector: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStocks, setFilteredStocks] = useState<StockData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load initial stocks
    loadStocks();
    
    // Auto-refresh every 30 seconds
    const intervalId = setInterval(refreshStocks, 30000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredStocks(stocks);
    } else {
      const filtered = stocks.filter(stock => 
        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStocks(filtered);
    }
  }, [stocks, searchQuery]);

  const loadStocks = () => {
    // This fetches the mock stock data
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

    // Add any custom stocks from local storage
    const uploadedData = localStorage.getItem("uploadedStocks");
    const customStocks = uploadedData ? JSON.parse(uploadedData) : [];

    const mockStocks = [...baseStocks, ...customStocks].map(stock => {
      const price = parseFloat((500 + Math.random() * 2500).toFixed(2));
      const change = parseFloat((Math.random() * 4 - 2).toFixed(2));
      const bidAskSpread = price * 0.0005;

      return {
        ...stock,
        symbol: stock.symbol?.toUpperCase() || "UNKNOWN",
        name: stock.name || `Stock ${stock.symbol}`,
        price,
        change,
        volume: Math.floor(Math.random() * 10000000),
        bid: parseFloat((price - bidAskSpread).toFixed(2)),
        ask: parseFloat((price + bidAskSpread).toFixed(2)),
        lastUpdated: new Date()
      };
    });

    setStocks(mockStocks);
    setFilteredStocks(mockStocks);
  };

  const refreshStocks = () => {
    setRefreshing(true);
    
    // If a stock is selected, update just that one to maintain selection
    if (selectedStock) {
      setTimeout(() => {
        const updatedStocks = [...stocks];
        const index = updatedStocks.findIndex(stock => stock.symbol === selectedStock.symbol);
        
        if (index !== -1) {
          const price = parseFloat((selectedStock.price * (1 + (Math.random() * 0.02 - 0.01))).toFixed(2));
          const change = parseFloat((Math.random() * 4 - 2).toFixed(2));
          const bidAskSpread = price * 0.0005;
          
          updatedStocks[index] = {
            ...selectedStock,
            price,
            change,
            bid: parseFloat((price - bidAskSpread).toFixed(2)),
            ask: parseFloat((price + bidAskSpread).toFixed(2)),
            lastUpdated: new Date()
          };
          
          setStocks(updatedStocks);
          setSelectedStock(updatedStocks[index]);
        }
        
        setRefreshing(false);
      }, 500);
    } else {
      // Otherwise refresh all stocks
      setTimeout(() => {
        loadStocks();
        setRefreshing(false);
      }, 500);
    }
  };

  const handleSelectStock = (symbol: string) => {
    const stock = stocks.find(s => s.symbol === symbol);
    if (stock) {
      setSelectedStock(stock);
      setIsOpen(false);
      toast({
        title: "Stock Selected",
        description: `${stock.symbol} - ${stock.name} has been selected.`,
      });
    }
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

  const getBidAskColor = (price: number, referencePrice: number) => {
    return price >= referencePrice ? "text-green-500" : "text-red-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Selector</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative flex-1">
              <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={isOpen}
                    className="w-full justify-between"
                  >
                    {selectedStock ? selectedStock.symbol : "Select a stock..."}
                    <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput 
                      placeholder="Search stocks..." 
                      value={searchQuery} 
                      onValueChange={setSearchQuery}
                    />
                    <CommandList>
                      <CommandEmpty>No stocks found.</CommandEmpty>
                      <CommandGroup heading="Stocks">
                        {filteredStocks.map((stock) => (
                          <CommandItem
                            key={stock.symbol}
                            onSelect={() => handleSelectStock(stock.symbol)}
                          >
                            <div className="flex items-center">
                              <span className="font-medium">{stock.symbol}</span>
                              <span className="ml-2 text-muted-foreground">{stock.name}</span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={refreshStocks}
              disabled={refreshing}
              className="flex-shrink-0"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              <span className="sr-only">Refresh</span>
            </Button>
          </div>

          {selectedStock && (
            <div className="mt-6 border rounded-md p-4">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold">{selectedStock.symbol}</h3>
                    <p className="text-sm text-muted-foreground">{selectedStock.name}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-lg font-bold">₹{selectedStock.price.toLocaleString()}</div>
                    <div className={`text-sm ${selectedStock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change}%
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-muted/30 p-3 rounded-md">
                    <div className="text-sm text-muted-foreground">Bid Price</div>
                    <div className={`text-xl font-bold ${getBidAskColor(selectedStock.bid, selectedStock.price)}`}>
                      ₹{selectedStock.bid.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-md">
                    <div className="text-sm text-muted-foreground">Ask Price</div>
                    <div className={`text-xl font-bold ${getBidAskColor(selectedStock.ask, selectedStock.price)}`}>
                      ₹{selectedStock.ask.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between mt-2 text-xs text-muted-foreground">
                  <div>Volume: {selectedStock.volume.toLocaleString()}</div>
                  <div>Last Updated: {formatDateTime(selectedStock.lastUpdated)}</div>
                </div>
                
                <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                  <div>Spread: ₹{(selectedStock.ask - selectedStock.bid).toFixed(2)}</div>
                  <div>Spread %: {((selectedStock.ask - selectedStock.bid) * 100 / selectedStock.price).toFixed(2)}%</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StockSelector;
