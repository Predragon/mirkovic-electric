'use client'

import { useEffect } from 'react'

export default function GoHighLevelForm() {
  useEffect(() => {
    // Load GoHighLevel form embed script
    const script = document.createElement('script')
    script.src = 'https://link.msgsndr.com/js/form_embed.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="w-full">
      <iframe
        src="https://api.leadconnectorhq.com/widget/form/O2BgIkUyRcytJ2XQaUrF"
        style={{
          width: '100%',
          height: '600px',
          border: 'none',
          borderRadius: '4px'
        }}
        id="inline-O2BgIkUyRcytJ2XQaUrF"
        data-layout='{"id":"INLINE"}'
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="New Request"
        data-height="600"
        data-layout-iframe-id="inline-O2BgIkUyRcytJ2XQaUrF"
        data-form-id="O2BgIkUyRcytJ2XQaUrF"
        title="New Request"
      />
    </div>
  )
}
