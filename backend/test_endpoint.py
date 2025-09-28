# import requests
# import urllib.parse

# # Your Amazon URL
# amazon_url = "https://www.amazon.ca/BOTANIC-Eucalyptus-Athletes-Ringworms-Promotes/dp/B09BP297TJ/ref=sr_1_2_sspa?crid=238QBA0QGUN1&dib=eyJ2IjoiMSJ9.MhZRzxxbIX_tGKNrFchEUecOxpz4y7o1mbHuWDky364xsbuMdmVmnfpphgW1v--huONCANJwD8G2WcU-siYpn-uRVo_arCht5_ivDxss_TE.obT1gTubgr2UX8uyKBJgZ1Q_M0vdviyKIewjH_B5KXg&dib_tag=se&keywords=radiance+body+wash+Vitamin+B3+antioxidant+hydrating+men&qid=1758999099&s=beauty&sprefix=radiance+body+wash+vitamin+b3+antioxidant+hydrating+men,beauty,63&sr=1-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1"

# # URL encode the query parameter
# encoded_url = urllib.parse.quote(amazon_url, safe='')

# # Make the request
# response = requests.get(f"http://localhost:8000/search?query={encoded_url}")

# # Print the results
# if response.status_code == 200:
#     print("Success!")
#     print(response.json())
# else:
#     print(f"Error: {response.status_code}")
#     print(response.text)