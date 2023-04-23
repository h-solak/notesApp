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

import FavoritesSvg from '../../assets/svg/undrawheart.svg';
import AlarmedNotesSvg from '../../assets/svg/undrawalarm.svg';
import ImageNotesSvg from '../../assets/svg/undrawimages.svg';

const NoteTypeCarousels = ({navigation}) => {
  const dispatch = useDispatch();
  const {width, height} = useWindowDimensions();

  const [temp, setTemp] = useState(false);
  const allTypes = [
    {
      name: 'Your\nFavorites',
      filter: 'Your Favorites',
      color: '#A824D3',
      img: (
        <View
          style={{
            position: 'absolute',
            bottom: 25,
            right: '5%',
            resizeMode: 'contain',
          }}>
          <FavoritesSvg width={width * 0.3} height={width * 0.3} />
        </View>
      ), //parent's width is width*0.4
    },
    {
      name: 'Alarmed Notes',
      filter: 'Alarmed Notes',
      color: '#3498db',
      img: (
        <View
          style={{
            position: 'absolute',
            bottom: 25,
            right: '5%',
            resizeMode: 'contain',
          }}>
          <AlarmedNotesSvg width={width * 0.3} height={width * 0.3} />
        </View>
      ),
    },
    {
      name: 'Notes with Images',
      filter: 'Notes with Images',
      color: '#248a22',
      img: (
        <View
          style={{
            position: 'absolute',
            bottom: 25,
            right: '5%',
            resizeMode: 'contain',
          }}>
          <ImageNotesSvg width={width * 0.3} height={width * 0.3} />
        </View>
      ),
    },
  ];
  return (
    <View className="mt-4 h-64">
      <ScrollView
        className="h-40 flex-row gap-3 pl-4 pr-4"
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {/*DAILY TASKS FEATURE -NOT DONE- */}
        {/* <TouchableOpacity
          className={`w-40 rounded-3xl px-5`}
          style={{width: width * 0.4, backgroundColor: '#8838ff'}}
          activeOpacity={0.8}
          onPress={null}>
          <Text
            className="text-white font-bold text-xl mt-6 pr-4"
            style={{lineHeight: 24}}>
            {'Daily Tasks'}
          </Text>
          <View className="my-6" style={{gap: 16}}>
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
        </TouchableOpacity> */}
        <TouchableOpacity
          className={`rounded-3xl px-5`}
          style={{width: width * 0.4, backgroundColor: '#ff7979'}}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('Task');
          }}>
          {/* <TouchableOpacity
              className="absolute h-10 w-10 rounded-full items-center justify-center p-2"
              style={{
                right: 10,
                top: 10,
                backgroundColor: 'rgba(255,255,255,0.3)',
                zIndex: 99,
              }}
              onPress={() =>null}>
              <AntIcon name="hearto" size={22} style={{color: '#fff'}} />
            </TouchableOpacity> */}
          <Text
            className="text-white font-bold text-lg mt-6 pr-4"
            style={{lineHeight: 24}}>
            Tasks
          </Text>

          <View
            style={{
              position: 'absolute',
              bottom: 25,
              right: '5%',
              resizeMode: 'contain',
            }}>
            <AlarmedNotesSvg width={width * 0.3} height={width * 0.3} />
          </View>

          {/* <Image
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
            /> */}
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
              onPress={() =>null}>
              <AntIcon name="hearto" size={22} style={{color: '#fff'}} />
            </TouchableOpacity> */}
            <Text
              className="text-white font-bold text-lg mt-6 pr-4"
              style={{lineHeight: 24}}>
              {item.name}
            </Text>

            {item.img}

            {/* <Image
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
            /> */}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default NoteTypeCarousels;
