import { supabase } from '../lib/supabase';

export async function seedDummyMoodData(userId: string) {
  const moods = [];
  const now = new Date();
  
  // Generate 3-5 moods per day for the last 7 days
  for (let daysAgo = 0; daysAgo < 7; daysAgo++) {
    const moodsPerDay = Math.floor(Math.random() * 3) + 3; // 3-5 moods per day
    
    for (let i = 0; i < moodsPerDay; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - daysAgo);
      date.setHours(Math.floor(Math.random() * 14) + 7); // Between 7 AM and 9 PM
      date.setMinutes(Math.floor(Math.random() * 60));
      
      // Generate realistic mood patterns
      let moodScore;
      const hour = date.getHours();
      
      // Morning: tend to be neutral to good
      if (hour >= 7 && hour < 12) {
        moodScore = Math.floor(Math.random() * 4) + 5; // 5-8
      }
      // Afternoon: generally good
      else if (hour >= 12 && hour < 17) {
        moodScore = Math.floor(Math.random() * 4) + 6; // 6-9
      }
      // Evening: more variable
      else {
        moodScore = Math.floor(Math.random() * 6) + 4; // 4-9
      }
      
      // Add some randomness for bad days (10% chance)
      if (Math.random() < 0.1) {
        moodScore = Math.floor(Math.random() * 3) + 2; // 2-4
      }
      
      const sampleTexts = [
        "Feeling great today! Had a productive morning.",
        "A bit stressed with work deadlines.",
        "Amazing day! Everything went perfectly.",
        "Feeling neutral, just going through the motions.",
        "Had a great workout, feeling energized!",
        "Tired but satisfied with today's progress.",
        "Anxious about tomorrow's presentation.",
        "Peaceful evening, enjoying some me time.",
        "Excited about the weekend plans!",
        "Dealing with some personal challenges.",
        "Grateful for the support from friends.",
        "Accomplished a lot today, feeling proud.",
        "Need more sleep, feeling exhausted.",
        "Happy to spend time with family.",
        "Work was tough but managed to push through.",
        "Feeling creative and inspired!",
        "Just an average day, nothing special.",
        "Meditation helped calm my mind.",
        "Frustrated with technical issues.",
        "Enjoying the beautiful weather outside."
      ];
      
      // 70% chance of having a text note
      const hasText = Math.random() < 0.7;
      
      moods.push({
        user_id: userId,
        mood_score: moodScore,
        entry_type: 'text',
        text_content: hasText ? sampleTexts[Math.floor(Math.random() * sampleTexts.length)] : null,
        created_at: date.toISOString(),
        synced: true,
      });
    }
  }
  
  // Sort by date ascending
  moods.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  
  try {
    const { data, error } = await supabase
      .from('mood_entries')
      .insert(moods);
    
    if (error) throw error;
    
    console.log(`Successfully seeded ${moods.length} mood entries`);
    return { success: true, count: moods.length };
  } catch (error) {
    console.error('Error seeding dummy data:', error);
    return { success: false, error };
  }
}

export async function checkAndSeedData(userId: string) {
  try {
    // Check if user already has mood entries
    const { data: existingMoods, error: checkError } = await supabase
      .from('mood_entries')
      .select('id')
      .eq('user_id', userId)
      .limit(1);
    
    if (checkError) throw checkError;
    
    // Only seed if no existing moods
    if (!existingMoods || existingMoods.length === 0) {
      console.log('No existing moods found, seeding dummy data...');
      return await seedDummyMoodData(userId);
    } else {
      console.log('User already has mood entries, skipping seed');
      return { success: true, skipped: true };
    }
  } catch (error) {
    console.error('Error checking/seeding data:', error);
    return { success: false, error };
  }
}