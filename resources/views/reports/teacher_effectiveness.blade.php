<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Teacher Effectiveness Report</title>
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
        <h1>Teacher Effectiveness Report</h1>
        <div class="date-range">
            Period: {{ $startDate->format('M d, Y') }} - {{ $endDate->format('M d, Y') }}
        </div>
    </div>

    <div>
        <h2>Overview</h2>
        <p>This report evaluates teacher effectiveness based on student engagement, assignment completion rates, and overall student performance.</p>
    </div>

    <div>
        <h2>Teacher Effectiveness Metrics</h2>
        <table>
            <thead>
                <tr>
                    <th>Teacher Name</th>
                    <th>Student Engagement (%)</th>
                    <th>Assignment Completion (%)</th>
                    <th>Student Performance (%)</th>
                    <th>Effectiveness Score</th>
                </tr>
            </thead>
            <tbody>
                @foreach($data as $teacher)
                <tr>
                    <td>{{ $teacher['teacher']->name }}</td>
                    <td>{{ $teacher['student_engagement'] }}%</td>
                    <td>{{ $teacher['assignment_completion'] }}%</td>
                    <td>{{ $teacher['student_performance'] }}%</td>
                    <td>{{ number_format($teacher['effectiveness_score'], 1) }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <div class="summary">
        <h2>Summary Findings</h2>
        <p>Based on the data collected during this period, the following observations can be made:</p>
        <ul>
            <li>Average student engagement across all teachers: {{ number_format(collect($data)->avg('student_engagement'), 1) }}%</li>
            <li>Average assignment completion rate: {{ number_format(collect($data)->avg('assignment_completion'), 1) }}%</li>
            <li>Average student performance: {{ number_format(collect($data)->avg('student_performance'), 1) }}%</li>
        </ul>
        <p>Teachers with the highest effectiveness scores:</p>
        <ol>
            @foreach(collect($data)->sortByDesc('effectiveness_score')->take(3) as $teacher)
            <li>{{ $teacher['teacher']->name }} ({{ number_format($teacher['effectiveness_score'], 1) }})</li>
            @endforeach
        </ol>
    </div>

    <div class="footer">
        <p>Report generated on {{ now()->format('F d, Y') }} by {{ auth()->user()->name }}</p>
        <p>iLearnZ School Management System &copy; {{ date('Y') }}</p>
    </div>
</body>
</html>
