import json
from ibm_watson import ToneAnalyzerV3
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

authenticator = IAMAuthenticator(
    'ahfSVXBK0hmj2zU-60yKeJczvIw_ijtcvgCEng-tdKeZ')
tone_analyzer = ToneAnalyzerV3(
    version='2017-09-21',
    authenticator=authenticator
)

tone_analyzer.set_service_url(
    'https://api.eu-gb.tone-analyzer.watson.cloud.ibm.com/instances/1ced2d6f-2204-4255-ade1-4f7acffad583')

text = 'US biotechnology company @Novavax is starting human trials of a coronavirus vaccine in Melbourne and Brisbane, with 131 volunteers to test its safety and look for early signs of its effectiveness.'
tone_analysis = tone_analyzer.tone(
    {'text': text},
    content_type='application/json',
    sentences=False
).get_result()

print(tone_analysis)
