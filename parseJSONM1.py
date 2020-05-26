import json

def cleanStr4SQL(s):
    return s.replace("'","`").replace("\n"," ")

def parseBusinessData():
    #read the JSON file
    with open('.\yelp_business.JSON','r') as f:  #Assumes that the data files are available in the current directory. If not, you should set the path for the yelp data files.
        outfile =  open('business.txt', 'w')
        line = f.readline()
        count_line = 0
        #read each JSON abject and extract data
        while line:
            data = json.loads(line)
            outfile.write(cleanStr4SQL(data['business_id'])+'\t') #business id
            outfile.write(cleanStr4SQL(data['name'])+'\t') #name
            outfile.write(cleanStr4SQL(data['address'])+'\t') #full_address
            outfile.write(cleanStr4SQL(data['state'])+'\t') #state
            outfile.write(cleanStr4SQL(data['city'])+'\t') #city
            outfile.write(cleanStr4SQL(data['postal_code']) + '\t')  #zipcode
            outfile.write(str(data['latitude'])+'\t') #latitude
            outfile.write(str(data['longitude'])+'\t') #longitude
            outfile.write(str(data['stars'])+'\t') #stars
            outfile.write(str(data['review_count'])+'\t') #reviewcount
            outfile.write(str(data['is_open'])+'\t') #openstatus
            outfile.write(str([item for item in  data['categories']])+'\t') #category list
            outfile.write(str([])) # write your own code to process attributes
            outfile.write(str([])) # write your own code to process hours
            outfile.write('\n');

            line = f.readline()
            count_line +=1
    print(count_line)
    outfile.close()
    f.close()

def parseUserData():
    # In yelp_user.json : Parse all keys except “compliment” keys and “elite” key.
    #{"average_stars": 3.94, "compliment_cool": 1556, "compliment_cute": 211, "compliment_funny": 1556, "compliment_hot": 1285, "compliment_list": 101, "compliment_more": 134, "compliment_note": 1295, "compliment_photos": 162, "compliment_plain": 2134, "compliment_profile": 74, "compliment_writer": 402, "cool": 40110, "elite": [2014, 2017, 2011, 2012, 2015, 2009, 2013, 2007, 2016, 2006, 2010, 2008], "fans": 835,"friends": ["U_sn0B-HWdTSlHNXIl_4XA", "pnfVIB7UhvCQ7X2K0Q2XIw", "jVYzrVblDFSuL3GHtt8ZSA", "Z7bpqY89ZiBHXdo7UN1kiw", "8Aqr35f254lOeitNowt7ig", "zjcN27kCVeK8K2ONe9Qt4g", "8drMKNHWavs2g6uf0pLtvg", "_K2ViyfmVq6nzIitR0TIlg", "rUV1FUhji5xMjNBpcq5SXg", "yrGIgk5eaWy-eewLNv4KHQ", "3Vd_ATdvvuVVgn_YCpz8fw", "ebC_pH92K4uxyDenoXb5bg", "RJrGgtBXkpX2oEHM4hSqXg", "sdpIz4-s15T239CZ4Bd6Ag", "A0j21z2Q1HGic7jW6e9h7A", "AvC5XQAElcGAAn_Wr5auEg", "JlkHKBnHKdK8Tpls0AF5Aw", "8AG5MctcxTjP4svmUrt0yQ", "bKxdvn7KpmWjMzlmBvp-Xw", "VVMS74JyUk2h53yfC-xNsA", "-ro7OG3jjCSKnF6OJinKjg", "K7thO1n-vZ9PFYiC7nTR2w", "pRBzWnFzaCEtqhYyJ2ZTDQ", "nwESZ8e-KzXt2fKkOuRdIQ", "WNZfkL4DBspueoGSUOMAqA", "uU6fQWadr7Hx_MP0Vmy3kQ", "XiLxIJThWsE0x4d0IeSPsg", "Y9LBTbwO4g0BmdBIi0D3CA", "jGbj8fl575EIQJcfaA1FKQ", "nxWrhF_hyX0wwjrEkQX8uQ", "670k6Gr6V4VqLIKtVEmDuQ", "o5STsEtfvD1Ig0J7Z-1uxA", "x13yoEggBL0pIE7-KMnhDQ", "rCx7tb3toOJUsvdOeqYY0g", "nkN_do3fJ9xekchVC-v68A", "KzHRsFwryS7b5Fog8kkkGA", "_pBzBgtCTN9PNUPfgPDI8A", "PU5QaMADa6N_9ZoQ04ZjOw", "FkfpHzqoDRChwOYhA6NPnQ", "CaQy-zz10ajG7KkNSbXi5w", "brQ7OjB6f9nXWGk45A9A3g"], "funny": 10882, "name": "Andrea", "review_count": 2559, "useful": 83681, "user_id": "om5ZiponkpRqUNa3pVPiRg", "yelping_since": "2006-01-18"}
    #write code to parse yelp_user.JSON
    with open('yelp_user.JSON', 'r') as f:
        outfile = open('user.txt', 'w')
        line = f.readline()
        count_line = 0
        #read each JSON object and extract data
        while line:
            data = json.loads(line)
            outfile.write(cleanStr4SQL(data['average_stars'])+'\t') #average stars
            outfile.write(cleanStr4SQL(data['cool'])+'\t') #cool
            outfile.write(cleanStr4SQL(data['fans'])+'\t') #fans
            outfile.write(str([item for item in data['friends']])+'\t') #friends list
            outfile.write(cleanStr4SQL(data['funny'])+'\t') #funny
            outfile.write(cleanStr4SQL(data['name'])+'\t') #name
            outfile.write(cleanStr4SQL(data['review_count'])+'\t') #review count
            outfile.write(cleanStr4SQL(data['useful'])+'\t') #useful
            outfile.write(cleanStr4SQL(data['user_id'])+'\t') #user id
            outfile.write(cleanStr4SQL(data['yelping_since'])+'\t') #yelping since
            outfile.write('\n')
            
            line = f.readline()
            count_line +=1
    print(count_line)
    outfile.close()
    f.close()
    

def parseCheckinData():
    #In yelp_checkin.json : Parse all keys.
    #{"time": {"Friday": {"20:00": 2, "19:00": 1, "22:00": 10, "21:00": 5, "23:00": 14, "0:00": 2, "18:00": 2}, "Thursday": {"23:00": 1, "0:00": 1, "19:00": 1, "18:00": 1, "16:00": 2, "22:00": 2}, "Wednesday": {"17:00": 2, "23:00": 3, "16:00": 1, "22:00": 1, "19:00": 1, "21:00": 1}, "Sunday": {"16:00": 2, "17:00": 2, "19:00": 1, "22:00": 4, "21:00": 4, "0:00": 3, "1:00": 2}, "Saturday": {"21:00": 4, "20:00": 3, "23:00": 10, "22:00": 7, "18:00": 1, "15:00": 2, "16:00": 1, "17:00": 1, "0:00": 8, "1:00": 1}, "Tuesday": {"19:00": 1, "17:00": 1, "1:00": 2, "21:00": 1, "23:00": 3}, "Monday": {"18:00": 2, "23:00": 1, "22:00": 2}}, "business_id": "dwQEZBFen2GdihLLfWeexA"}
    #read the JSON file
    with open('yelp_checkin.JSON','r') as f:  #Assumes that the data files are available in the current  directory. If not, you should set the path for the yelp data files.
        outfile =  open('checkin.txt', 'w')
        line = f.readline()
        count_line = 0
        #read each JSON abject and extract data
        while line:
            data = json.loads(line)
            # The “time” check-in JSON objects are in the form of:
            #”day”: {“hour”: number of checkins ,....}
            for day, hour in data.items():
                if isinstance(hour, dict):
                    for key, value in hour.items(): #"20:00": 2
                        outfile.write(str(key)+'\t')
                        for key1, value1 in value.items():
                            outfile.write(str("{}: {}".format(key1, value1))+'\t')
                else:
                    outfile.write(str(v)+'\t')

            outfile.write('\n')
            line = f.readline()
            count_line +=1
    
    print(count_line)
    outfile.close()
    f.close()


def parseReviewData():
    #In yelp_review.json: Parse all keys.
    #{"review_id":"ClgrKJ6dqiM7vSKJBJ2w6Q","user_id":"T5MGS0NHBCWgofZ6Q6Btng","business_id":"dwQEZBFen2GdihLLfWeexA","stars":4,"date":"2013-06-03","text":"I've been here at least 5 times now and each time is better than the last. I Iove what they have done to improve the building and add outdoor dining. Service is always good here and on par with other top places in Mentor. I really suggest the chicken soup on a cold day it's very yummy! Everything I've had on the menu has been great.","useful":0,"funny":0,"cool":0}
    #write code to parse yelp_review.JSON
    with open('.\yelp_review.JSON','r') as f:
        outfile = open('review.txt', 'w') #opens new file to store parsed data
        line = f.readline()
        num_line = 0

        while line:
            data = json.loads(line)
            outfile.write(cleanStr4SQL(data['review_id']) + '\t') #writes review id and adds tab
            outfile.write(cleanStr4SQL(data['user_id']) + '\t') #user_id
            outfile.write(cleanStr4SQL(data['business_id']) + '\t') #business
            outfile.write(str(data['stars']) + '\t') #stars
            outfile.write(cleanStr4SQL(data['date']) + '\t') #date
            outfile.write(cleanStr4SQL(data['text']) + '\t') #text
            outfile.write(str(data['useful']) + '\t')
            outfile.write(str(data['funny']) + '\t')
            outfile.write(str(data['cool']) + '\t')
            outfile.write('\n')
            
            line = f.readline()
            num_line += 1


    print(num_line)
    outfile.close()
    f.close()

parseBusinessData()
parseUserData()
parseCheckinData()
parseReviewData()
