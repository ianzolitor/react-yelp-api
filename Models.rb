class User < ActiveRecord::Base
	has_many :favorites
	has_many :businesses, through: :favorites

	validates :username, uniqueness: true, presence: true
	validates :password, presence: true
end

class Business < ActiveRecord::Base
	has_many :favorites
	has_many :users, through: :favorites
end

class Favorite < ActiveRecord::Base
	belongs_to :user
	belongs_to :business
end
