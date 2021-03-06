import styled from 'styled-components/native';
import {FlatList} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  background: #28282e;

  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const HearderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  line-height: 28px;
`;

export const UserName = styled.Text`
  color: #ff9000;
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px 16px;
`;

export const ProvidersListTitle = styled.Text`
  font-size: 24px;
  margin-bottom: 24px;
  color: #f4ede8;
`;

export const ProviderContainer = styled(RectButton)`
  background: #3e3b47;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  align-items: center;
  flex-direction: row;
`;

export const ProviderAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`;

export const ProviderInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ProviderName = styled.Text`
  font-size: 18px;
  color: #f4ede8;
`;

export const ProviderMeta = styled.View`
  align-items: center;
  flex-direction: row;
  margin-top: 8px;
`;

export const ProviderMetaText = styled.Text`
  margin-left: 8px;
  color: #999591;
`;
