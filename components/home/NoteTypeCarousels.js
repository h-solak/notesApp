import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import {selectNoteTypeAndFilter} from '../../redux/slices/noteSlice';

const NoteTypeCarousels = ({navigation}) => {
  const dispatch = useDispatch();
  const {width, height} = useWindowDimensions();

  const [temp, setTemp] = useState(false);
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
      color: '#3498db',
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
        className="h-40 flex-row gap-3 pl-4 pr-4"
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          className={`w-40 rounded-3xl px-5`}
          style={{width: width * 0.4, backgroundColor: '#8838ff'}}
          activeOpacity={0.8}
          onPress={null}>
          <Text
            className="text-white font-bold text-xl mt-6 pr-4"
            style={{lineHeight: 24}}>
            {'Tasks'}
          </Text>
          <View className="my-8" style={{gap: 16}}>
            {[0, 0, 0].map((item, index) => (
              <TouchableOpacity
                key={index}
                className={`flex-row items-center rounded-full px-2 py-2 ${
                  temp ? 'bg-white40' : 'bg-white50'
                }`}
                style={{gap: 12}}
                onPress={() => setTemp(!temp)}>
                <FeatherIcon
                  name={temp ? 'check-circle' : 'circle'} //check-circle
                  size={20}
                  style={{color: temp ? '#ffffff70' : '#ffffff'}}
                />
                <Text
                  className={`${
                    temp ? 'text-white70 line-through' : 'text-white'
                  }`}>
                  draw cash
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
        {allTypes.map((item, index) => (
          <TouchableOpacity
            key={index}
            className={`rounded-3xl px-5 ${
              index === allTypes?.length - 1 ? 'mr-8' : null
            }`}
            style={{width: width * 0.4, backgroundColor: item.color}}
            activeOpacity={0.8}
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
