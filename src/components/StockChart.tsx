
import React from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface StockData {
  timestamp: string;
  price: number;
  fullTimestamp?: Date;
}

interface StockChartProps {
  symbol: string;
  data: StockData[];
  color?: string;
}

// Generate mock data for the stock chart
const generateMockChartData = (lastPrice: number, dataPoints: number = 30) => {
  const data: StockData[] = [];
  let currentPrice = lastPrice;
  const now = new Date();
  
  for (let i = dataPoints; i >= 0; i--) {
    // Add some random fluctuation to the price
    const change = Math.random() * 3 - 1.5; // Random change between -1.5% and +1.5%
    currentPrice = currentPrice * (1 + change / 100);
    
    // Calculate timestamp for this data point
    const timestamp = new Date(now.getTime() - i * 5 * 60000); // 5-minute intervals
    
    data.push({
      timestamp: timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fullTimestamp: timestamp,
      price: parseFloat(currentPrice.toFixed(2)),
    });
  }
  
  return data;
};

const StockChart: React.FC<StockChartProps> = ({ symbol, data: initialData, color = "#22c55e" }) => {
  // If no data is provided, generate mock data based on symbol to ensure consistency
  const [data, setData] = React.useState(() => {
    // Use a seed based on the symbol string to generate consistent initial data
    const symbolSum = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const basePrice = 500 + (symbolSum % 1500); // Price between 500 and 2000
    return initialData && initialData.length > 0 ? initialData : generateMockChartData(basePrice, 30);
  });
  
  // Simulate live updates
  React.useEffect(() => {
    console.log("Chart initialized for", symbol, "with", data.length, "data points");
    
    const intervalId = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData];
        // Remove the first item
        newData.shift();
        
        // Add a new item at the end
        const lastPrice = newData[newData.length - 1].price;
        const change = Math.random() * 3 - 1.5; // Random change between -1.5% and +1.5%
        const newPrice = lastPrice * (1 + change / 100);
        
        const now = new Date();
        newData.push({
          timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          fullTimestamp: now,
          price: parseFloat(newPrice.toFixed(2)),
        });
        
        return newData;
      });
    }, 5000); // Update every 5 seconds
    
    return () => clearInterval(intervalId);
  }, [symbol]); // Re-initialize when symbol changes
  
  // Calculate min and max price for Y-axis
  const minPrice = Math.min(...data.map(d => d.price)) * 0.998;
  const maxPrice = Math.max(...data.map(d => d.price)) * 1.002;
  
  // Format for x-axis ticks - show hour:minute
  const formatXAxis = (tickItem: string) => {
    return tickItem;
  };
  
  // Custom tooltip formatter to show full date and time - with null check
  const tooltipFormatter = (value: number, name: string, props: any) => {
    if (!props || !props.payload || props.payload.index === undefined) {
      return [`₹${value.toFixed(2)}`, 'Price'];
    }
    
    const dataPoint = data[props.payload.index];
    if (!dataPoint) {
      return [`₹${value.toFixed(2)}`, 'Price'];
    }
    
    const formattedDate = dataPoint.fullTimestamp ? 
      dataPoint.fullTimestamp.toLocaleString([], {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }) : dataPoint.timestamp;
    
    return [`₹${value.toFixed(2)}`, `Price at ${formattedDate}`];
  };
  
  return (
    <div className="w-full h-full">
      <ChartContainer
        config={{
          price: {
            color,
          },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 20 }}>
            <defs>
              <linearGradient id={`gradient-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="timestamp"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              minTickGap={20}
              tickFormatter={formatXAxis}
              label={{
                value: 'Time',
                position: 'insideBottomRight',
                offset: -5,
                className: 'text-xs text-muted-foreground'
              }}
            />
            <YAxis
              domain={[minPrice, maxPrice]}
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tickFormatter={(value) => `₹${value.toFixed(2)}`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  indicator="line"
                  formatter={tooltipFormatter}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={color}
              fillOpacity={1}
              fill={`url(#gradient-${symbol})`}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
      <div className="text-xs text-center text-muted-foreground mt-2">
        {data[data.length - 1]?.fullTimestamp ? (
          <>Last updated: {data[data.length - 1].fullTimestamp.toLocaleString([], {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
          })}</>
        ) : (
          <>Updating chart data...</>
        )}
      </div>
    </div>
  );
};

export default StockChart;
