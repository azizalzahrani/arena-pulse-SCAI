import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CameraFeed } from '../camera-feed';
import { Camera } from '@/types';

describe('CameraFeed', () => {
  const mockCamera: Camera = {
    id: '1',
    name: 'Test Camera',
    image: 'https://example.com/image.jpg',
    detectionCount: 0,
    location: 'Test Location',
    status: 'online',
    lastUpdated: new Date()
  };

  it('renders camera information correctly', () => {
    render(<CameraFeed camera={mockCamera} />);
    
    // Use queryByText for optional fields
    const nameElement = screen.getByText('Test Camera');
    const locationElement = screen.queryByText('Test Location');
    const statusElement = screen.getByText('Online');

    expect(nameElement).toBeInTheDocument();
    expect(locationElement).toBeInTheDocument();
    expect(statusElement).toBeInTheDocument();
  });

  it('renders the camera feed container', () => {
    render(<CameraFeed camera={mockCamera} />);
    
    const feedContainer = screen.getByTestId('camera-feed-container');
    expect(feedContainer).toBeInTheDocument();
  });

  it('renders detection boxes when they are present', async () => {
    render(<CameraFeed camera={mockCamera} />);
    
    // Wait for detection boxes to appear (they are generated with a delay)
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
    });
    
    const detectionBoxes = screen.getAllByTestId('detection-box');
    expect(detectionBoxes.length).toBeGreaterThan(0);
  });

  it('renders in fullscreen mode when fullscreen prop is true', () => {
    render(<CameraFeed camera={mockCamera} fullscreen />)
    
    const container = screen.getByTestId('camera-feed-container')
    expect(container).toHaveClass('fixed inset-0')
  })

  it('generates detection boxes based on camera detection count', () => {
    render(<CameraFeed camera={mockCamera} />)
    
    const detectionBoxes = screen.getAllByTestId('detection-box')
    expect(detectionBoxes).toHaveLength(mockCamera.detectionCount)
  })

  it('updates detection box positions over time', () => {
    render(<CameraFeed camera={mockCamera} />)
    
    const initialBoxes = screen.getAllByTestId('detection-box')
    const initialPositions = initialBoxes.map(box => ({
      left: box.style.left,
      top: box.style.top
    }))

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    const updatedBoxes = screen.getAllByTestId('detection-box')
    const updatedPositions = updatedBoxes.map(box => ({
      left: box.style.left,
      top: box.style.top
    }))

    expect(initialPositions).not.toEqual(updatedPositions)
  })

  it('handles window resize events without errors', () => {
    render(<CameraFeed camera={mockCamera} />)
    
    act(() => {
      window.dispatchEvent(new Event('resize'))
    })

    // No errors should be thrown
    expect(screen.getByTestId('camera-feed-container')).toBeInTheDocument()
  })

  it('displays correct confidence values for detection boxes', () => {
    render(<CameraFeed camera={mockCamera} />)
    
    const confidenceTexts = screen.getAllByText(/Confidence: \d+%/);
    confidenceTexts.forEach(text => {
      const confidence = parseInt(text.textContent?.match(/\d+/)![0] || '0');
      expect(confidence).toBeGreaterThanOrEqual(65);
      expect(confidence).toBeLessThanOrEqual(95);
    });
  })

  it('maintains detection boxes within container bounds', () => {
    render(<CameraFeed camera={mockCamera} />)
    
    const container = screen.getByTestId('camera-feed-container')
    const containerRect = container.getBoundingClientRect()
    
    const detectionBoxes = screen.getAllByTestId('detection-box')
    detectionBoxes.forEach(box => {
      const boxRect = box.getBoundingClientRect()
      expect(boxRect.left).toBeGreaterThanOrEqual(containerRect.left)
      expect(boxRect.right).toBeLessThanOrEqual(containerRect.right)
      expect(boxRect.top).toBeGreaterThanOrEqual(containerRect.top)
      expect(boxRect.bottom).toBeLessThanOrEqual(containerRect.bottom)
    })
  })

  it('cleans up intervals on unmount', () => {
    const { unmount } = render(<CameraFeed camera={mockCamera} />)
    
    const initialBoxes = screen.getAllByTestId('detection-box')
    const initialPositions = initialBoxes.map(box => ({
      left: box.style.left,
      top: box.style.top
    }))

    unmount()

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    // No errors should be thrown after unmount
    expect(() => {
      jest.advanceTimersByTime(1000)
    }).not.toThrow()
  })
}) 