
import { supabase } from '@/lib/customSupabaseClient';

/**
 * Sends an event to the Facebook Conversions API via a Supabase Edge Function.
 * @param {string} eventName - The name of the event (e.g., 'Lead', 'ViewContent').
 * @param {object} userData - User data to send with the event.
 * @param {object} customData - Custom data to send with the event.
 * @param {string} eventId - A unique ID for the event, used for deduplication.
 */
export const sendCapiEvent = async (eventName, userData = {}, customData = {}, eventId = null) => {
  try {
    const { error } = await supabase.functions.invoke('facebook-capi', {
      body: {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        user_data: userData,
        custom_data: customData,
      },
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    // Log the error but don't let it break the user experience.
    console.error('CAPI event failed:', error.message);
  }
};
