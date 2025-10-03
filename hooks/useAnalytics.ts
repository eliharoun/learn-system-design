import { useCallback } from 'react'
import { event } from '../utils/gtag'

export const useAnalytics = () => {
  const trackEvent = useCallback((
    action: string,
    category: string,
    label?: string,
    value?: number
  ) => {
    event({ action, category, label, value })
  }, [])

  // Predefined tracking functions for common events
  const trackButtonClick = useCallback((buttonName: string, location?: string) => {
    trackEvent('click', 'button', `${buttonName}${location ? ` - ${location}` : ''}`)
  }, [trackEvent])

  const trackTopicView = useCallback((topicName: string) => {
    trackEvent('view', 'topic', topicName)
  }, [trackEvent])

  const trackDiagramView = useCallback((diagramName: string) => {
    trackEvent('view', 'diagram', diagramName)
  }, [trackEvent])

  const trackFlashcardInteraction = useCallback((action: 'flip' | 'next' | 'previous', cardTitle: string) => {
    trackEvent(action, 'flashcard', cardTitle)
  }, [trackEvent])

  const trackResourceClick = useCallback((resourceName: string, resourceType: string) => {
    trackEvent('click', 'resource', `${resourceType} - ${resourceName}`)
  }, [trackEvent])

  const trackProgressUpdate = useCallback((section: string, progress: number) => {
    trackEvent('progress_update', 'learning', section, progress)
  }, [trackEvent])

  return {
    trackEvent,
    trackButtonClick,
    trackTopicView,
    trackDiagramView,
    trackFlashcardInteraction,
    trackResourceClick,
    trackProgressUpdate,
  }
}
