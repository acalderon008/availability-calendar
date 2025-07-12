// Color utilities for participant identification

// Predefined color palette for participants
const PARTICIPANT_COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#06B6D4', // Cyan
  '#F97316', // Orange
  '#EC4899', // Pink
  '#84CC16', // Lime
  '#6366F1', // Indigo
  '#F43F5E', // Rose
  '#14B8A6', // Teal
  '#FBBF24', // Yellow
  '#A855F7', // Violet
  '#06B6D4', // Sky
];

// Map to store participant name to color assignments
const participantColorMap = new Map();

// Get or assign a color for a participant
export const getParticipantColor = (participantName) => {
  if (!participantName) return PARTICIPANT_COLORS[0];
  
  if (participantColorMap.has(participantName)) {
    return participantColorMap.get(participantName);
  }
  
  // Assign next available color
  const colorIndex = participantColorMap.size % PARTICIPANT_COLORS.length;
  const color = PARTICIPANT_COLORS[colorIndex];
  participantColorMap.set(participantName, color);
  
  return color;
};

// Get all participant colors for a calendar
export const getParticipantColors = (availability) => {
  const colors = {};
  availability.forEach(avail => {
    colors[avail.name] = getParticipantColor(avail.name);
  });
  return colors;
};

// Reset color assignments (useful for testing)
export const resetColorAssignments = () => {
  participantColorMap.clear();
}; 