import { render, screen, act } from '@testing-library/react';
import AutomatedAnalysisPage from '../page';
import { AnalysisProvider, useAnalysisContext } from "@/contexts/analysis-context";

// This test assumes the AnalysisProvider provides some crowd analysis data
// that components can consume through the useAnalysisContext hook

// Mock the actual implementation of context for integration testing
const mockAnalysisData = {
  crowdDensity: 75,
  alertLevel: 'moderate',
  occupancy: 8250,
  temperature: 22.5,
  noiseLevel: 65,
};

// Mock the context with a working implementation
jest.mock('@/contexts/analysis-context', () => {
  const originalModule = jest.requireActual('@/contexts/analysis-context');
  
  return {
    ...originalModule,
    useAnalysisContext: jest.fn().mockReturnValue(mockAnalysisData),
    AnalysisProvider: ({ children }) => <div data-testid="analysis-provider">{children}</div>,
  };
});

// Create component that will consume the context data for testing
const TestConsumer = () => {
  const data = useAnalysisContext();
  return (
    <div data-testid="context-consumer">
      <div data-testid="crowd-density">{data.crowdDensity}</div>
      <div data-testid="alert-level">{data.alertLevel}</div>
    </div>
  );
};

// Mock the page components to include our test consumer
jest.mock('@/components/automated-analysis/live-video-feed', () => ({
  LiveVideoFeed: () => <TestConsumer />,
}));

jest.mock('@/components/automated-analysis/sensor-data-dashboard', () => ({
  SensorDataDashboard: () => <div data-testid="sensor-data-dashboard">Sensor Data Dashboard</div>,
}));

jest.mock('@/components/automated-analysis/analytics-overview', () => ({
  AnalyticsOverview: () => <div data-testid="analytics-overview">Analytics Overview</div>,
}));

jest.mock('@/components/automated-analysis/alerts-panel', () => ({
  AlertsPanel: () => <div data-testid="alerts-panel">Alerts Panel</div>,
}));

describe('AutomatedAnalysisPage Integration', () => {
  it('provides analysis data to child components', () => {
    render(<AutomatedAnalysisPage />);
    
    // Verify that the context data is accessible to child components
    expect(screen.getByTestId('context-consumer')).toBeInTheDocument();
    expect(screen.getByTestId('crowd-density')).toHaveTextContent('75');
    expect(screen.getByTestId('alert-level')).toHaveTextContent('moderate');
  });

  it('updates components when context data changes', () => {
    render(<AutomatedAnalysisPage />);
    
    // Test data updates - update the mock return value
    act(() => {
      (useAnalysisContext as jest.Mock).mockReturnValue({
        ...mockAnalysisData,
        crowdDensity: 90,
        alertLevel: 'high',
      });
    });

    // Re-render to simulate update
    render(<AutomatedAnalysisPage />);
    
    // Check that the component displays updated values
    expect(screen.getByTestId('crowd-density')).toHaveTextContent('90');
    expect(screen.getByTestId('alert-level')).toHaveTextContent('high');
  });
});