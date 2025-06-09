/**
 * Parse time string in MM:SS or HH:MM format to seconds
 * @param timeStr - Time string like "01:30" or "1:05:30"
 * @returns Number of seconds
 */
export const parseTimeToSeconds = (timeStr: string): number => {
  const parts = timeStr.split(':').map(Number);
  
  if (parts.length === 2) {
    // MM:SS format
    const [minutes, seconds] = parts;
    if (minutes === undefined || seconds === undefined) {
      throw new Error(`Invalid time format: ${timeStr}`);
    }
    return minutes * 60 + seconds;
  } else if (parts.length === 3) {
    // HH:MM:SS format
    const [hours, minutes, seconds] = parts;
    if (hours === undefined || minutes === undefined || seconds === undefined) {
      throw new Error(`Invalid time format: ${timeStr}`);
    }
    return hours * 3600 + minutes * 60 + seconds;
  }
  
  throw new Error(`Invalid time format: ${timeStr}. Use MM:SS or HH:MM:SS`);
};

/**
 * Parse time range string like "01:05-02:15" to start and end seconds
 * @param rangeStr - Range string in format "MM:SS-MM:SS"
 * @returns Object with startSeconds and endSeconds
 */
export const parseTimeRange = (rangeStr: string): { startSeconds: number; endSeconds: number } => {
  const [startStr, endStr] = rangeStr.split('-');
  
  if (!startStr || !endStr) {
    throw new Error(`Invalid range format: ${rangeStr}. Use MM:SS-MM:SS`);
  }
  
  const startSeconds = parseTimeToSeconds(startStr.trim());
  const endSeconds = parseTimeToSeconds(endStr.trim());
  
  if (startSeconds >= endSeconds) {
    throw new Error(`Start time (${startStr}) must be before end time (${endStr})`);
  }
  
  return { startSeconds, endSeconds };
};

/**
 * Convert seconds to frame numbers based on FPS
 * @param seconds - Time in seconds
 * @param fps - Frames per second (default 30)
 * @returns Frame number
 */
export const secondsToFrames = (seconds: number, fps: number = 30): number => {
  return Math.floor(seconds * fps);
};

/**
 * Validate that time ranges are within video duration and each clip is max 30 seconds
 * @param ranges - Array of time range strings
 * @param videoDurationSeconds - Total video duration in seconds
 * @returns Validation result with any errors
 */
export const validateTimeRanges = (
  ranges: string[],
  videoDurationSeconds: number
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  for (let i = 0; i < ranges.length; i++) {
    try {
      const { startSeconds, endSeconds } = parseTimeRange(ranges[i]!);
      
      // Check if range is within video duration
      if (endSeconds > videoDurationSeconds) {
        errors.push(
          `Clip ${i + 1}: End time exceeds video duration (${Math.floor(videoDurationSeconds / 60)}:${String(Math.floor(videoDurationSeconds % 60)).padStart(2, '0')})`
        );
      }
      
      // Check if clip duration is max 30 seconds
      const clipDuration = endSeconds - startSeconds;
      if (clipDuration > 30) {
        errors.push(`Clip ${i + 1}: Duration (${clipDuration}s) exceeds 30 second limit`);
      }
      
    } catch (error) {
      errors.push(`Clip ${i + 1}: ${error instanceof Error ? error.message : 'Invalid time range'}`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Calculate total duration of all clips combined
 * @param ranges - Array of time range strings
 * @returns Total duration in seconds
 */
export const calculateTotalClipDuration = (ranges: string[]): number => {
  let totalSeconds = 0;
  
  for (const range of ranges) {
    const { startSeconds, endSeconds } = parseTimeRange(range);
    totalSeconds += endSeconds - startSeconds;
  }
  
  return totalSeconds;
}; 