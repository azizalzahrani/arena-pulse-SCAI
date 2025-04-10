import { render, screen } from '@testing-library/react';
import AutomatedAnalysisPage from '../page';
import { AnalysisProvider } from "@/contexts/analysis-context";

// Mock the components used in the page
jest.mock('@/components/automated-analysis/live-video-feed', () => ({
  LiveVideoFeed: () => <div data-testid="live-video-feed">Live Video Feed</div>,
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

// Mock the context provider
jest.mock('@/contexts/analysis-context', () => ({
  AnalysisProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="analysis-provider">{children}</div>
  ),
}));

describe('AutomatedAnalysisPage', () => {
  it('renders all components', () => {
    render(<AutomatedAnalysisPage />);
    
    // Check if all components are rendered
    expect(screen.getByTestId('analysis-provider')).toBeInTheDocument();
    expect(screen.getByTestId('live-video-feed')).toBeInTheDocument();
    expect(screen.getByTestId('analytics-overview')).toBeInTheDocument();
    expect(screen.getByTestId('sensor-data-dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('alerts-panel')).toBeInTheDocument();
  });

  it('has the correct layout structure', () => {
    render(<AutomatedAnalysisPage />);
    
    // Check for main container
    const mainContainer = screen.getByTestId('analysis-provider').firstChild;
    expect(mainContainer).toHaveClass('flex flex-col gap-4 p-4 md:p-8');
    
    // Check for grid container
    const gridContainer = mainContainer?.firstChild;
    expect(gridContainer).toHaveClass('grid gap-4 md:grid-cols-2 lg:grid-cols-3');
  });
});