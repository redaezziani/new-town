import * as d3 from "d3";
import { format } from "date-fns";
import { CSSProperties } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

function Chart({ data, className }: { data: { value: number; date: Date }[] , className: string}) {
  let xScale = d3
    .scaleTime()
    .domain([data[0].date, data[data.length - 1].date])
    .range([0, 100]);
  let yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data.map((d) => d.value)) ?? 0])
    .range([100, 0]);

  let line = d3
    .line<(typeof data)[number]>()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.value));

  let d = line(data);

  if (!d) {
    return null;
  }

  return (
    <div
      className="@container relative h-full w-full"
      style={
        {
          "--marginTop": "6px",
          "--marginRight": "8px",
          "--marginBottom": "25px",
          "--marginLeft": "25px",
        } as CSSProperties
      }
    >
      {/* X axis */}
      <svg
        className="absolute inset-0
          h-[calc(100%-var(--marginTop))]
          w-[calc(100%-var(--marginLeft)-var(--marginRight))]
          translate-x-[var(--marginLeft)]
          translate-y-[var(--marginTop)]
          overflow-visible
        "
      >
        {data.map((day, i) => (
          <g key={i}
          className={cn('className="overflow-visible font-medium text-primary-500"', className)}
          >
            <text
              x={`${xScale(day.date)}%`}
              y="100%"
              textAnchor={
                i === 0 ? "start" : i === data.length - 1 ? "end" : "middle"
              }
              fill="currentColor"
              className="@sm:inline hidden text-sm"
            >
              {format(day.date, "EEE")}
            </text>
            <text
              x={`${xScale(day.date)}%`}
              y="100%"
              textAnchor={
                i === 0 ? "start" : i === data.length - 1 ? "end" : "middle"
              }
              fill="currentColor"
              className="@sm:hidden text-xs"
            >
              {format(day.date, "EEEEE")}
            </text>
          </g>
        ))}
      </svg>

      {/* Y axis */}
      <svg
        className="absolute inset-0
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          translate-y-[var(--marginTop)]
          overflow-visible
        "
       

      >
        <g className="translate-x-4">
          {yScale
            .ticks(8)
            .map(yScale.tickFormat(8, "d"))
            .map((value, i) => (
              <text
                key={i}
                y={`${yScale(+value)}%`}
                alignmentBaseline="middle"
                textAnchor="end"
                className={cn('text-xs tabular-nums text-primary-600', className)}
                fill="currentColor"
              >
                {value}
              </text>
            ))}
        </g>
      </svg>

      {/* Chart area */}
      <svg
        className="absolute inset-0
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          w-[calc(100%-var(--marginLeft)-var(--marginRight))]
          translate-x-[var(--marginLeft)]
          translate-y-[var(--marginTop)]
          overflow-visible
        "
      >
        <svg
          viewBox="0 0 100 100"
          className="overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          {yScale
            .ticks(8)
            .map(yScale.tickFormat(8, "d"))
            .map((active, i) => (
              <g
                transform={`translate(0,${yScale(+active)})`}
                className={cn('className="overflow-visible font-medium text-primary-500"', className)}

                key={i}
              >
                <line
                  x1={0}
                  x2={100}
                  stroke="currentColor"
                  strokeDasharray="6,5"
                  strokeWidth={0.5}
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            ))}

          {/* Line */}
          <path
            d={d}
            fill="none"
            className={cn('text-primary-600', className)}
            stroke="currentColor"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />

          {/* Circles */}
          {data.map((d) => (
            <path
              key={d.date.toString()}
              d={`M ${xScale(d.date)} ${yScale(d.value)} l 0.0001 0`}
              vectorEffect="non-scaling-stroke"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
              stroke="currentColor"
              className={cn('text-primary-600', className)}
            />
          ))}
        </svg>
      </svg>
    </div>
  );
}

export default Chart;
