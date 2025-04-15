
import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Mock indices and their constituent stocks
const indices = [
  { id: "nifty50", name: "NIFTY 50" },
  { id: "sensex", name: "SENSEX" },
  { id: "niftyit", name: "NIFTY IT" },
  { id: "niftymidcap50", name: "NIFTY MIDCAP 50" },
  { id: "niftynext50", name: "NIFTY NEXT 50" },
  { id: "niftysmallcap50", name: "NIFTY SMALLCAP 50" },
];

// Generate mock stock data for each index
const getStocksForIndex = (indexId: string) => {
  // Common IT stocks
  const itStocks = [
    { symbol: "TCS", name: "Tata Consultancy Services", price: 3672.00, volume: 1254678 },
    { symbol: "INFY", name: "Infosys", price: 1764.70, volume: 7589354 },
    { symbol: "HCLTECH", name: "HCL Technologies", price: 1643.00, volume: 4453714 },
    { symbol: "WIPRO", name: "Wipro", price: 295.20, volume: 12574668 },
    { symbol: "LTIM", name: "L&T Infotech", price: 5045.75, volume: 1198440 },
    { symbol: "TECHM", name: "Tech Mahindra", price: 1612.00, volume: 1670697 },
    { symbol: "PERSISTENT", name: "Persistent Systems", price: 5622.30, volume: 649433 },
    { symbol: "COFORGE", name: "Coforge", price: 7604.00, volume: 650383 },
    { symbol: "MPHASIS", name: "Mphasis", price: 2485.50, volume: 430685 },
    { symbol: "LTTS", name: "L&T Technology Services", price: 4870.00, volume: 411762 },
  ];

  // Banking stocks
  const bankingStocks = [
    { symbol: "HDFCBANK", name: "HDFC Bank", price: 1521.55, volume: 8574123 },
    { symbol: "ICICIBANK", name: "ICICI Bank", price: 1012.40, volume: 7485632 },
    { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", price: 1625.80, volume: 3625414 },
    { symbol: "AXISBANK", name: "Axis Bank", price: 1042.75, volume: 5874125 },
    { symbol: "SBIN", name: "State Bank of India", price: 745.20, volume: 9874563 },
    { symbol: "INDUSINDBK", name: "IndusInd Bank", price: 1425.30, volume: 2587413 },
    { symbol: "AUBANK", name: "AU Small Finance Bank", price: 698.45, volume: 1254789 },
    { symbol: "FEDERALBNK", name: "Federal Bank", price: 152.80, volume: 4785632 },
    { symbol: "BANDHANBNK", name: "Bandhan Bank", price: 214.55, volume: 3587412 },
    { symbol: "IDFCFIRSTB", name: "IDFC First Bank", price: 86.75, volume: 8574123 },
  ];

  // Consumer stocks
  const consumerStocks = [
    { symbol: "HINDUNILVR", name: "Hindustan Unilever", price: 2485.60, volume: 3254789 },
    { symbol: "ITC", name: "ITC", price: 425.35, volume: 8745632 },
    { symbol: "NESTLEIND", name: "Nestle India", price: 24586.75, volume: 987452 },
    { symbol: "BRITANNIA", name: "Britannia Industries", price: 4852.30, volume: 1254893 },
    { symbol: "MARICO", name: "Marico", price: 574.25, volume: 2587413 },
    { symbol: "DABUR", name: "Dabur India", price: 523.80, volume: 1578942 },
    { symbol: "GODREJCP", name: "Godrej Consumer Products", price: 1187.45, volume: 1254896 },
    { symbol: "COLPAL", name: "Colgate-Palmolive", price: 2145.60, volume: 854712 },
    { symbol: "EMAMILTD", name: "Emami", price: 523.75, volume: 754812 },
    { symbol: "TATACONSUM", name: "Tata Consumer Products", price: 1045.30, volume: 2145896 },
  ];

  // Energy stocks
  const energyStocks = [
    { symbol: "RELIANCE", name: "Reliance Industries", price: 2856.45, volume: 12547896 },
    { symbol: "ONGC", name: "Oil and Natural Gas Corporation", price: 258.75, volume: 7854123 },
    { symbol: "IOC", name: "Indian Oil Corporation", price: 145.80, volume: 5874123 },
    { symbol: "BPCL", name: "Bharat Petroleum", price: 578.45, volume: 3254789 },
    { symbol: "GAIL", name: "GAIL India", price: 154.25, volume: 4587412 },
    { symbol: "NTPC", name: "NTPC", price: 325.45, volume: 5874123 },
    { symbol: "POWERGRID", name: "Power Grid Corporation", price: 287.65, volume: 3254789 },
    { symbol: "TATAPOWER", name: "Tata Power", price: 412.85, volume: 7854123 },
    { symbol: "ADANIGREEN", name: "Adani Green Energy", price: 1854.65, volume: 2587413 },
    { symbol: "ADANIPOWER", name: "Adani Power", price: 524.35, volume: 3254789 },
  ];

  // Stocks for different indices
  const stocksMap: Record<string, Array<any>> = {
    nifty50: [
      ...itStocks.slice(0, 3),
      ...bankingStocks.slice(0, 3),
      ...consumerStocks.slice(0, 2),
      ...energyStocks.slice(0, 2),
    ],
    sensex: [
      ...itStocks.slice(0, 2),
      ...bankingStocks.slice(0, 3),
      ...consumerStocks.slice(0, 3),
      ...energyStocks.slice(0, 2),
    ],
    niftyit: [...itStocks],
    niftymidcap50: [
      ...bankingStocks.slice(5, 10),
      ...consumerStocks.slice(5, 10),
      ...energyStocks.slice(5, 10),
    ],
    niftynext50: [
      ...itStocks.slice(5, 8),
      ...bankingStocks.slice(3, 6),
      ...consumerStocks.slice(3, 6),
      ...energyStocks.slice(3, 6),
    ],
    niftysmallcap50: [
      ...itStocks.slice(7, 10),
      ...bankingStocks.slice(7, 10),
      ...consumerStocks.slice(7, 10),
      ...energyStocks.slice(7, 10),
    ],
  };

  // Return the stocks for the selected index
  return stocksMap[indexId] || [];
};

// Generate performance data for each stock
const generatePerformanceData = (stocks: any[]) => {
  return stocks.map(stock => {
    // Generate random percentage changes with more negative bias for a bearish market
    const generateChange = (min: number, max: number) => {
      return parseFloat((Math.random() * (max - min) + min).toFixed(1));
    };

    // Occasionally add a positive value
    const getChange = () => {
      const randomValue = Math.random();
      if (randomValue > 0.8) {
        return generateChange(0.1, 2.5); // 20% chance of positive
      }
      return generateChange(-8.5, -0.1); // 80% chance of negative
    };

    const changes = {
      day1: getChange(),
      day2: getChange(),
      day3: getChange(),
      day5: getChange(),
      day10: getChange(),
      day20: getChange(),
    };

    return {
      ...stock,
      changes,
    };
  });
};

// Determine the color class based on the value
const getColorClass = (value: number) => {
  if (value > 0) return "bg-green-500 text-white";
  return "bg-red-500 text-white";
};

const IndexDetails = () => {
  const [selectedIndex, setSelectedIndex] = useState("nifty50");
  const [stocks, setStocks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Load stocks for the selected index
  useEffect(() => {
    fetchStocksData();
  }, [selectedIndex]);

  const fetchStocksData = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const fetchedStocks = getStocksForIndex(selectedIndex);
      const stocksWithPerformance = generatePerformanceData(fetchedStocks);
      setStocks(stocksWithPerformance);
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 800);
  };

  const handleRefresh = () => {
    fetchStocksData();
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Index Details</CardTitle>
          <Button variant="outline" size="sm" onClick={handleRefresh} className="h-9">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Stocks
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <label htmlFor="index-select" className="block text-sm font-medium mb-2">
              Select Predefined Index
            </label>
            <Select
              value={selectedIndex}
              onValueChange={(value) => setSelectedIndex(value)}
            >
              <SelectTrigger className="w-full" id="index-select">
                <SelectValue placeholder="Select an index" />
              </SelectTrigger>
              <SelectContent>
                {indices.map((index) => (
                  <SelectItem key={index.id} value={index.id}>
                    {index.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {isLoading ? (
            <div className="h-[400px] w-full flex items-center justify-center">
              <div className="animate-pulse bg-muted h-full w-full rounded"></div>
            </div>
          ) : (
            <>
              <div className="text-sm text-muted-foreground">
                This is cached data for index{" "}
                <span className="font-medium text-foreground">{indices.find(i => i.id === selectedIndex)?.name}</span>
                <div className="text-xs mt-1">
                  Last updated: {lastUpdated.toLocaleString()}
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Sl.No</TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>1d</TableHead>
                      <TableHead>2d</TableHead>
                      <TableHead>3d</TableHead>
                      <TableHead>5d</TableHead>
                      <TableHead>10d</TableHead>
                      <TableHead>20d</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stocks.map((stock, index) => (
                      <TableRow key={stock.symbol}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium">{stock.symbol}</TableCell>
                        <TableCell>₹{stock.price.toLocaleString()}</TableCell>
                        <TableCell>{stock.volume.toLocaleString()}</TableCell>
                        <TableCell className={getColorClass(stock.changes.day1)}>
                          {stock.changes.day1 > 0 ? "+" : ""}{stock.changes.day1}%
                        </TableCell>
                        <TableCell className={getColorClass(stock.changes.day2)}>
                          {stock.changes.day2 > 0 ? "+" : ""}{stock.changes.day2}%
                        </TableCell>
                        <TableCell className={getColorClass(stock.changes.day3)}>
                          {stock.changes.day3 > 0 ? "+" : ""}{stock.changes.day3}%
                        </TableCell>
                        <TableCell className={getColorClass(stock.changes.day5)}>
                          {stock.changes.day5 > 0 ? "+" : ""}{stock.changes.day5}%
                        </TableCell>
                        <TableCell className={getColorClass(stock.changes.day10)}>
                          {stock.changes.day10 > 0 ? "+" : ""}{stock.changes.day10}%
                        </TableCell>
                        <TableCell className={getColorClass(stock.changes.day20)}>
                          {stock.changes.day20 > 0 ? "+" : ""}{stock.changes.day20}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default IndexDetails;
