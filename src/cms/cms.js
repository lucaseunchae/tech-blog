import CMS from 'decap-cms-app'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import PostPreview from './preview-templates/post-preview'

CMS.init()

CMS.registerPreviewStyle('preview.css')
CMS.registerPreviewTemplate('post', PostPreview)
CMS.registerMediaLibrary(cloudinary)
