<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Resource Utilization Report</title>
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
        <h1>Resource Utilization Report</h1>
        <div class="date-range">
            Period: {{ $startDate->format('M d, Y') }} - {{ $endDate->format('M d, Y') }}
        </div>
    </div>

    <div>
        <h2>Overview</h2>
        <p>This report analyzes educational resource usage and distribution across all schools in the system during the specified period.</p>
    </div>

    <div>
        <h2>Resource Utilization Metrics by School</h2>
        <table>
            <thead>
                <tr>
                    <th>School Name</th>
                    <th>Digital Resource Usage (%)</th>
                    <th>Physical Resource Usage (%)</th>
                    <th>Resource Efficiency (%)</th>
                    <th>Utilization Score</th>
                </tr>
            </thead>
            <tbody>
                @foreach($data as $school)
                <tr>
                    <td>{{ $school['school']->name }}</td>
                    <td>{{ $school['digital_resource_usage'] }}%</td>
                    <td>{{ $school['physical_resource_usage'] }}%</td>
                    <td>{{ $school['resource_efficiency'] }}%</td>
                    <td>{{ number_format($school['utilization_score'], 1) }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <div class="summary">
        <h2>Summary Findings</h2>
        <p>Based on the data collected during this period, the following observations can be made:</p>
        <ul>
            <li>Average digital resource usage across all schools: {{ number_format(collect($data)->avg('digital_resource_usage'), 1) }}%</li>
            <li>Average physical resource usage: {{ number_format(collect($data)->avg('physical_resource_usage'), 1) }}%</li>
            <li>Average resource efficiency: {{ number_format(collect($data)->avg('resource_efficiency'), 1) }}%</li>
        </ul>
        <p>Schools with the highest resource utilization scores:</p>
        <ol>
            @foreach(collect($data)->sortByDesc('utilization_score')->take(3) as $school)
            <li>{{ $school['school']->name }} ({{ number_format($school['utilization_score'], 1) }})</li>
            @endforeach
        </ol>
    </div>

    <div class="footer">
        <p>Report generated on {{ now()->format('F d, Y') }} by {{ auth()->user()->name }}</p>
        <p>iLearnZ School Management System &copy; {{ date('Y') }}</p>
    </div>
</body>
</html>
