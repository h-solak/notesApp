import React, {useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity, Image} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {selectNoteTypeAndFilter} from '../../redux/slices/noteSlice';

const NoteTypeCarousels = ({navigation}) => {
  const dispatch = useDispatch();
  const allTypes = [
    {
      name: 'Your\nFavorites',
      filter: 'Your Favorites',
      color: '#A824D3',
      img: 'https://i.ibb.co/yPDQyMp/pngwing-com-2.png',
    },
    {
      name: 'Alarmed Notes',
      filter: 'Alarmed Notes',
      color: '#6D2BCF',
      img: 'https://i.ibb.co/4MCPJht/pngwing-com.png',
    },
    {
      name: 'Notes with Images',
      filter: 'Notes with Images',
      color: '#248a22',
      img: 'https://i.ibb.co/6rk9sW8/pngwing-com-1.png',
    },
  ];
  return (
    <View className="mt-7 h-64">
      <ScrollView
        className="w-full h-40 flex-row gap-3"
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {allTypes.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="w-40 relative rounded-3xl px-5"
            style={{backgroundColor: item.color}}
            onPress={() => {
              dispatch(selectNoteTypeAndFilter(item.filter));
              navigation.navigate('NoteType');
            }}>
            {/* <TouchableOpacity
              className="absolute h-10 w-10 rounded-full items-center justify-center p-2"
              style={{
                right: 10,
                top: 10,
                backgroundColor: 'rgba(255,255,255,0.3)',
                zIndex: 99,
              }}
              onPress={() => console.log('goofy')}>
              <AntIcon name="hearto" size={22} style={{color: '#fff'}} />
            </TouchableOpacity> */}
            <Text
              className="text-white font-bold text-xl mt-6 pr-4"
              style={{lineHeight: 24}}>
              {item.name}
            </Text>

            <Image
              className="absolute"
              source={{uri: item.img}}
              style={{
                bottom: 10,
                right: '5%',
                width: '100%',
                height: '60%',
                resizeMode: 'contain',
                // borderWidth: 2,
                // borderColor: '#ffffff',
              }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default NoteTypeCarousels;
