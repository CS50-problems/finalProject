import os, requests, spotipy
from spotipy.oauth2 import SpotifyClientCredentials, SpotifyOAuth

import keys

def main(id=None, key=None, url=None, playList=False):
    spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id=id,client_secret=key))
    playlist = spotify.playlist_items(url, additional_types='track')

    artist_name = []
    track_name = []
    popularity = []
    track_id = []
    for i in range(0,100,20):
        track_results = spotify.search(q='year:2018', type='track', limit=20,offset=i)
        for i, t in enumerate(track_results['tracks']['items']):
            artist_name.append(t['artists'][0]['name'])
            track_name.append(t['name'])
            track_id.append(t['id'])
            popularity.append(t['popularity'])

main(keys.spotifyID,keys.spotifyKey,keys.spotifyPlaylist)
