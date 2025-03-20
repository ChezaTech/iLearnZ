<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>District Comparison Report</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
        }
        .logo {
            max-width: 150px;
            margin-bottom: 10px;
        }
        h1 {
            font-size: 24px;
            margin-bottom: 5px;
        }
        .date-range {
            font-size: 14px;
            color: #666;
            margin-bottom: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        .summary {
            margin-top: 30px;
            padding: 15px;
            background-color: #f5f5f5;
            border-radius: 5px;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #ddd;
            padding-top: 10px;
        }
    </style>
</head>
<body>
    <div class="header">
        <img src="{{ public_path('images/logo.png') }}" alt="iLearnZ Logo" class="logo">
        <h1>District Comparison Report</h1>
        <div class="date-range">
            Period: {{ $startDate->format('M d, Y') }} - {{ $endDate->format('M d, Y') }}
        </div>
    </div>

    <div>
        <h2>Overview</h2>
        <p>This report provides a comparative analysis of performance metrics across districts in the system during the specified period.</p>
    </div>

    <div>
        <h2>District Performance Metrics</h2>
        <table>
            <thead>
                <tr>
                    <th>District Name</th>
                    <th>Number of Schools</th>
                    <th>Overall Performance (%)</th>
                    <th>Resource Efficiency (%)</th>
                    <th>Teacher Effectiveness (%)</th>
                    <th>District Score</th>
                </tr>
            </thead>
            <tbody>
                @foreach($data as $district)
                <tr>
                    <td>{{ $district['district'] }}</td>
                    <td>{{ $district['school_count'] }}</td>
                    <td>{{ $district['overall_performance'] }}%</td>
                    <td>{{ $district['resource_efficiency'] }}%</td>
                    <td>{{ $district['teacher_effectiveness'] }}%</td>
                    <td>{{ number_format($district['district_score'], 1) }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <div class="summary">
        <h2>Summary Findings</h2>
        <p>Based on the data collected during this period, the following observations can be made:</p>
        <ul>
            <li>Average overall performance across all districts: {{ number_format(collect($data)->avg('overall_performance'), 1) }}%</li>
            <li>Average resource efficiency: {{ number_format(collect($data)->avg('resource_efficiency'), 1) }}%</li>
            <li>Average teacher effectiveness: {{ number_format(collect($data)->avg('teacher_effectiveness'), 1) }}%</li>
        </ul>
        <p>Districts with the highest performance scores:</p>
        <ol>
            @foreach(collect($data)->sortByDesc('district_score')->take(3) as $district)
            <li>{{ $district['district'] }} ({{ number_format($district['district_score'], 1) }})</li>
            @endforeach
        </ol>
    </div>

    <div class="footer">
        <p>Report generated on {{ now()->format('F d, Y') }} by {{ auth()->user()->name }}</p>
        <p>iLearnZ School Management System &copy; {{ date('Y') }}</p>
    </div>
</body>
</html>
