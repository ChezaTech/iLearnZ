<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ $report->name }}</title>
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
        <h1>{{ $report->name }}</h1>
        <div class="date-range">
            Period: {{ $startDate->format('M d, Y') }} - {{ $endDate->format('M d, Y') }}
        </div>
    </div>

    <div>
        <h2>Overview</h2>
        <p>This report provides data and analysis for the specified period.</p>
    </div>

    <div>
        <h2>Report Data</h2>
        @if(!empty($data))
            <table>
                <thead>
                    <tr>
                        @foreach(array_keys((array)$data[0]) as $key)
                            <th>{{ ucwords(str_replace('_', ' ', $key)) }}</th>
                        @endforeach
                    </tr>
                </thead>
                <tbody>
                    @foreach($data as $item)
                        <tr>
                            @foreach((array)$item as $value)
                                <td>
                                    @if(is_object($value))
                                        {{ $value->name ?? json_encode($value) }}
                                    @elseif(is_array($value))
                                        {{ json_encode($value) }}
                                    @else
                                        {{ $value }}
                                    @endif
                                </td>
                            @endforeach
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @else
            <p>No data available for this report.</p>
        @endif
    </div>

    <div class="summary">
        <h2>Summary</h2>
        <p>This report was generated based on data from {{ $startDate->format('M d, Y') }} to {{ $endDate->format('M d, Y') }}.</p>
    </div>

    <div class="footer">
        <p>Report generated on {{ now()->format('F d, Y') }} by {{ auth()->user()->name }}</p>
        <p>iLearnZ School Management System &copy; {{ date('Y') }}</p>
    </div>
</body>
</html>
